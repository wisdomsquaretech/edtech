<?php

namespace App\Filament\Resources\SessionAttendanceResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSessionAttendanceRequest extends FormRequest
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
			'session_id' => 'required',
			'user_id' => 'required',
			'joined_at' => 'required',
			'left_at' => 'required'
		];
    }
}
