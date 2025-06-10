<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lesson_media', function (Blueprint $table) {
            $table->id();            
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->foreignId('media_id')->constrained('media')->cascadeOnDelete();
            $table->integer('order')->nullable();
            //$table->primary(['lesson_id', 'media_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_media');
    }
};
