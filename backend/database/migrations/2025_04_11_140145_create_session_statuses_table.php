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

        Schema::create('session_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->enum('status', ["completed","incomplete","absent"]);
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_statuses');
    }
};
