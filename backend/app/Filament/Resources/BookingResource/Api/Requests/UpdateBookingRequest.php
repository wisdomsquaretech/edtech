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

     public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $slotId = $this->input('slot_id');
            // Get the booking id from route parameters, adjust param name if different
            $bookingId = $this->route('record');

            if ($slotId) {
                $slot = \App\Models\TutorAvailabilitySlot::find($slotId);
                if ($slot) {
                    $existingBookingCount = $slot->bookings()
                        ->where('id', '<>', $bookingId)
                        ->count();

                    $remainingCapacity = max(0, $slot->capacity - $existingBookingCount);

                    if ($remainingCapacity <= 0) {
                        $validator->errors()->add('slot_id', 'This tutor availability slot is already full.');
                    }
                }
            }
        });
    }
}
