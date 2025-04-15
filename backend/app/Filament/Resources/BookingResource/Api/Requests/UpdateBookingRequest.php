<?php

namespace App\Filament\Resources\BookingResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
			'student_id' => 'required',
			'slot_id' => 'required',
			'session_id' => 'required',
			'status' => 'required|string',
			'creator_id' => 'required'
		];
    }
}
