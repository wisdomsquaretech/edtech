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
			'tutor_id' => 'required',
			'slot_date' => 'required|date',
			'start_time' => 'required',
			'end_time' => 'required',
			'capacity' => 'required|integer',
			'is_booked' => 'required',
			'is_deleted' => 'required'
		];
    }
}
