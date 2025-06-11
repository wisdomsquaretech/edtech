<?php

namespace App\Filament\Resources\BookingResource\Api\Requests;

use App\Models\TutorAvailabilitySlot;
use Illuminate\Foundation\Http\FormRequest;

class CreateBookingRequest extends FormRequest
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

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $slot = TutorAvailabilitySlot::find($this->slot_id);
            
            if ($slot && $slot->remainingCapacity() <= 0) {
                $validator->errors()->add('slot_id', 'This tutor availability slot is already full.');
            }
        });
    }
}
