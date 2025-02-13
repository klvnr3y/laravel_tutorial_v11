<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Language::all();

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
        //
        $ret = [
            "success" => false,
            "message" => "Data not " . ($request->id ? "update" : "create")
        ];

        $data = $request->validate([
            'language' => 'required',

        ]);

        $createUpdate = Language::updateOrCreate(
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
    public function show(Language $language)
    {
        //
        $data = Language::find($language);

        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Language $language)
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

        $data = Language::find($id);

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
