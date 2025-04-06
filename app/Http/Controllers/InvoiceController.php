<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Invoices/Index', [
            'invoices' => Invoice::with(['customer', 'items.product'])
                ->when($request->input('search'), function ($query, $search) {
                    $query->whereHas('customer', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        })
                        ->orWhere('invoice_date', 'like', "%{$search}%")
                        ->orWhere('total_amount', 'like', "%{$search}%");
                })
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Invoices/Create', [
            'customers' => \App\Models\Customer::all(),
            'products' => Product::all()
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'customer_id' => 'required|exists:customers,id',
        'invoice_date' => 'required|date',
        'items' => 'required|array|min:1',
        'items.*.product_id' => 'required|exists:products,id',
        'items.*.quantity' => 'required|integer|min:1',
    ]);

    return DB::transaction(function () use ($validated) {
        // Create the invoice
        $invoice = Invoice::create([
            'customer_id' => $validated['customer_id'],
            'invoice_date' => $validated['invoice_date'],
            'total_amount' => 0,
        ]);

        $totalAmount = 0;

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            
            // Check stock availability
            if ($product->quantity < $item['quantity']) {
                throw new \Exception("Insufficient stock for product: {$product->name}");
            }

            $itemTotal = $product->price * $item['quantity'];
            
            // Create invoice item
            $invoice->items()->create([
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'unit_price' => $product->price,
                'total_price' => $itemTotal,
            ]);

            $totalAmount += $itemTotal;
            
            // Update product stock
            $product->decrement('quantity', $item['quantity']);
        }

        // Update invoice total
        $invoice->update(['total_amount' => $totalAmount]);

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice created successfully!');
    });
}
    public function show(Invoice $invoice)
    {
        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice->load(['customer', 'items.product'])
        ]);
    }

    public function destroy(Invoice $invoice)
    {
        DB::transaction(function () use ($invoice) {
            foreach ($invoice->items as $item) {
                $product = $item->product;
                $product->increment('quantity', $item->quantity);
            }

            $invoice->delete();
        });

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice deleted successfully!');
    }
}