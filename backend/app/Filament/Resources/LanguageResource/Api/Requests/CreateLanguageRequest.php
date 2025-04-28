<?php

namespace App\Filament\Resources\LanguageResource\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateLanguageRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'code' => 'required|min:2|max:10|alpha|unique:languages,code',
            'name' => 'required|min:2|max:255|alpha',
            'is_active' => 'required|boolean'
        ];
    }
}
