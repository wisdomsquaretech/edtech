<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTutorAvailabilityRequest extends FormRequest
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
			'day_of_week' => 'required|string',
			'start_time' => 'required',
			'end_time' => 'required'
		];
    }
}
