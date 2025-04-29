<?php

namespace App\Filament\Resources\TutorHoursLookupResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTutorHoursLookupRequest extends FormRequest
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
            'session_id' => 'required|exists:sessions,id',
            'tutor_id' => 'required|exists:users,id',
            'duration' => 'required|integer|min:0'
        ];
    }
}
