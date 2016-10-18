<?php

namespace App\Http\Controllers\Admin;

use App\Models\Bot;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use App\Models\Mongo\MongoProduct;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('admin/home');
    }

    /**
     * @return string
     */
    public function getProducts()
    {
        $userId = Auth::user()->id;
        $products = Product::where('user_id', $userId)->orderBy('created_at', 'DESC')->get();
        if($products) {
            return response()->json([
                'products' => $products,
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'products' => [],
                'status' => 'error'
            ]);
        }
    }

    /**
     * @param Request $request
     */
    public function addProduct(Request $request)
    {
        $destinationPath = 'assets\product-images'; // upload path
        $fileName = rand(11111,99999).$request->input('imgName');
        $request->file('file')->move($destinationPath, $fileName); // uploading file to given path
        $botIds = explode(',', $request->input('bots'));
        $bots = Bot::whereIn('id', $botIds)->pluck('id','name')->toArray();
        $mongoBots = Bot::whereIn('id', $botIds)->pluck('name')->toArray();


            $product = Product::create([
                'user_id' => Auth::user()->id,
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'started_price' => $request->input('startPrice'),
                'img' => $fileName,
                'real_price' => $request->input('realPrice'),
                'bots' => json_encode($bots),
                'started_time' => $request->input('startTime'),
            ]);

        if($product) {
            $mongoProduct = MongoProduct::create([
                'productId' => $product->id,
                'name' => $request->input('name'),
                'started_price' => $request->input('startPrice'),
                'real_price' => $request->input('realPrice'),
                'started_time' => strtotime($request->input('startTime')) - 14400,
                'bots' => $mongoBots,
                'status' => ''
            ]);
        }

        return response()->json([
            $product ? 'success' : 'error'
        ]);
    }

    public function update(Request $request)
    {
        $currentDate = strtotime(Carbon::now());
        $date = strtotime($request->input('startTime')) - 14400;
        $product = Product::where('id', $request->input('id'))->first();
        $mongoProduct = MongoProduct::where('productId', $product->id)->first();
        $botIds = explode(',', $request->input('bots'));
        $bots = Bot::whereIn('id', $botIds)->pluck('id','name')->toArray();
        $mongoBots = Bot::whereIn('id', $botIds)->pluck('name')->toArray();

        $data = [
            'user_id' => Auth::user()->id,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'started_price' => $request->input('startPrice'),
            'real_price' => $request->input('realPrice'),
            'started_time' => $request->input('startTime')
        ];

        $mongoData = [
            'name' => $request->input('name'),
            'started_price' => $request->input('startPrice'),
            'real_price' => $request->input('realPrice'),
            'started_time' => (strtotime($request->input('startTime')) - 14400),
        ];

        if(!empty($bots)) {
            $data['bots'] = json_encode($bots);
            $mongoData['bots'] = $mongoBots;
        }

        if($date > $currentDate) {
            $data['status'] = '';
            $data['winner'] = '';
            $mongoData['status'] = '';
        }

        if($request->file('file')) {
            $image_path = public_path("assets\\product-images\\".$product->img);
            if (File::exists($image_path)) {
                File::delete($image_path);
            }
            $destinationPath = 'assets\product-images';
            $fileName = rand(11111,99999).$request->input('imgName');
            $request->file('file')->move($destinationPath, $fileName); // uploading file to given path
            $data['img'] = $fileName;
        }
        $mongoProduct->update($mongoData);
        return response()->json([
            Product::where('id', $request->input('id'))->update($data) ? 'success' : 'error'
        ]);
    }

    public function getProductById(Request $request)
    {
        $product = Product::where('id', $request->input('id'))->first();
        $botIds = [];
        foreach (json_decode($product->bots) as $key=>$value) {
            $botIds[] = $value;
        }
        return response()->json([
            'status' => 'success',
            'product' => $product,
            'botIds' => $botIds
        ]);
    }

    public function deleteProduct(Request $request)
    {
        $product = Product::where('id', $request->input('id'))->first();
        $mongoProduct = MongoProduct::where('productId', $product->id)->first();
        $name = $product->img;
        $image_path = public_path("assets\\product-images\\".$name);
        if (File::exists($image_path)) {
            File::delete($image_path);
        }
        $mongoProduct->delete();
        return response()->json([
            Product::where('id', $request->input('id'))
                ->delete()
        ]);
    }

    public function getBots()
    {
        $userId = Auth::user()->id;
        $bots = Bot::where('user_id', $userId)->orderBy('created_at', 'DESC')->get();
        if ($bots) {
            return response()->json([
                'bots' => $bots,
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'bots' => [],
                'status' => 'error'
            ]);
        }
    }

    public function getBotById(Request $request)
    {
        $bot = Bot::where('id', $request->input('id'))->first();
        return response()->json([
            'status' => 'success',
            'bot' => $bot,
        ]);
    }

    public function addBot(Request $request)
    {
        return response()->json([
            Bot::create([
                'name' => $request->input('name'),
                'user_id' => Auth::user()->id

            ]) ? 'success' : 'error'
        ]);
    }

    public function updateBot(Request $request)
    {
        return response()->json([
            Bot::where('id', $request->input('id'))->update([
                'name' => $request->input('name')
            ]) ? 'success' : 'error'
        ]);
    }

    public function deleteBot(Request $request)
    {
        return response()->json([
            Bot::where('id', $request->input('id'))
                ->delete() ? 'success' : 'error'
        ]);
    }
}
