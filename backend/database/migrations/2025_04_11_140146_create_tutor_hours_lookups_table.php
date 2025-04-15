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

        Schema::create('tutor_hours_lookups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained();
            $table->foreignId('tutor_id')->constrained('users');
            $table->integer('duration');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutor_hours_lookups');
    }
};
