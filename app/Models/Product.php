<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'code', 'cost', 'price', 'quantity', 'description'];
    
    protected $casts = [
        'cost' => 'float',
        'price' => 'float',
        'quantity' => 'integer',
    ];
    
    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class);
    }
}