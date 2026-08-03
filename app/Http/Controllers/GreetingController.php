<?php

namespace App\Http\Controllers;

use App\Models\Greeting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GreetingController extends Controller
{
    /**
     * Display the main page with all greetings.
     */
    public function index()
    {
        $greetings = Greeting::orderByDesc('created_at')->get();

        return Inertia::render('Home', [
            'greetings' => $greetings,
        ]);
    }

    /**
     * Store a new greeting.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'perusahaan' => 'required|string|max:255',
            'ucapan' => 'required|string|max:2000',
            'device_id' => 'required|string|max:255|unique:greetings,device_id',
        ], [
            'nama.required' => 'Nama wajib diisi.',
            'perusahaan.required' => 'Perusahaan wajib dipilih.',
            'ucapan.required' => 'Ucapan wajib diisi.',
            'device_id.unique' => 'Anda sudah pernah memberikan ucapan.',
        ]);

        Greeting::create($validated);

        return redirect()->back()->with('success', 'Ucapan berhasil dikirim! Terima kasih. 🎉');
    }
}
