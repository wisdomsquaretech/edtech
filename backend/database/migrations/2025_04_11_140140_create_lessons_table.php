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
        Schema::disableForeignKeyConstraints();

        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('curriculum_id')->constrained();
            $table->string('title');
            $table->enum('level', ["beginner","intermediate","advanced"]);
            $table->text('description');
            $table->enum('file_type', ["pdf","video","ppt"]);
            $table->string('file_path');
            $table->string('language_code');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
