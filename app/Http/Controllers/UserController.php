<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::all();

        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not " . ($request->id ? "update" : "create")
        ];

        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . ($request->id ?? 'NULL') . ',id',
        ]);

        if (!$request->id) {
            $request->validate([
                'password' => 'required'
            ]);
        }

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $createUpdate = User::updateOrCreate(
            ['id' => $request->id ?? null],
            $data
        );

        if ($createUpdate) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "created")
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = User::find($id);

        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ret = [
            "success" => false,
            "message" => "Data not deleted"
        ];

        $data = User::find($id);

        if ($data) {
            $data->delete();

            $ret = [
                "success" => true,
                "message" => "Data deleted"
            ];
        }

        return response()->json($ret, 200);
    }
}
