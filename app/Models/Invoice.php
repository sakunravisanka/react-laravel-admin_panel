<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'invoice_date', 'total_amount'];

public function customer() {
    return $this->belongsTo(Customer::class);
}

public function items() {
    return $this->hasMany(InvoiceItem::class);
}
}