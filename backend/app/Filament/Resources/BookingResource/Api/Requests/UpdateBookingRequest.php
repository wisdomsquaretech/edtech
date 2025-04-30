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
            'student_id' => 'required|exists:users,id',
            'slot_id' => 'required|exists:tutor_availability_slots,id',
            'session_id' => 'required|exists:sessions,id',
            'status' => 'required|string|in:booked,cancelled,completed',
            'creator_id' => 'required|exists:users,id'
        ];
    }
}
