<?php

namespace App\Filament\Resources\TutorAvailabilitySlotResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTutorAvailabilitySlotRequest extends FormRequest
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
            'tutor_id' => 'required|exists:users,id',
            'slot_date' => 'required|date|date_format:d-m-Y',
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', function ($attribute, $value, $fail) {
                $startTime = request()->input('start_time');
                if ($startTime && strtotime($startTime) >= strtotime($value)) {
                    $fail('The end time must be after the start time.');
                }
            }],
            'capacity' => 'required|integer',
            'is_booked' => 'required|boolean',
            'is_deleted' => 'sometimes|date_format:d-m-Y H:i:s'
        ];
    }
}
