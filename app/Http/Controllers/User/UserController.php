<?php

namespace App\Http\Controllers\User;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use App\Jobs\getBids;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('user/home');
    }

    public function getProducts()
    {
        $this->dispatch((new getBids(70))->onQueue('bids'));

        $products = Product::orderBy('created_at', 'DESC')->get();
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

    public function updateProductTimeStatus(Request $request)
    {
        return response()->json([
            Product::where('id', $request->input('id'))
                ->update([
                    'status' => 'started'
                ]) ? 'status' : 'error'
        ]);
    }

    public function getProductById(Request $request)
    {
        $product = Product::where('id', $request->input('id'))->first();
        return response()->json([
            'status' => 'success',
            'product' => $product,
            'bidUser' => json_decode($product->winner)
        ]);
    }
}
