<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {       //
        $data = Position::all();

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
            'position' => 'required',


        ]);
        $createUpdate = Position::updateOrCreate(
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
        $data = Position::find($id);
        //
        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Position $position)
    {
        //

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $ret = [
            "success" => false,
            "message" => "Data not deleted"
        ];

        $data = Position::find($id);

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
