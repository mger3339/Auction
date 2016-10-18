<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use App\Jobs\getBids;

use App\Http\Requests;
use Psy\Util\Json;
use Symfony\Component\HttpFoundation\Response;

class SystemController extends Controller
{
    public function getUser()
    {
        $users = User::where('jwt_token', '!=', '')
            ->select('id', 'name', 'jwt_token')
            ->get();
        return response()->json(['status' => 'success', 'users' => $users ]);
    }

    public function updateProductTimeStatus(Request $request)
    {
//        if($request->input('status') == 'closed') {
//            $this->dispatch(new getBids($request->input('winner')));
//        }
        return response()->json([
            Product::where('id', $request->input('id'))
                ->update([
                    'winner' => json_encode($request->input('winner')),
                    'status' => $request->input('status')
                ]) ? 'status' : 'error'
        ]);
    }
}
