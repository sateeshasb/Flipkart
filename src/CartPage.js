// src/pages/CartPage.jsx
 
import { Trash2 } from 'lucide-react';

const CartPage = ({ cart = [], removeFromCart }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600 text-lg">🛒 Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-700">
                    Price: ₹{item.price.toLocaleString()} × {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Remove ${item.name} from cart`}
                  title="Remove"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white p-4 rounded shadow text-right font-bold text-xl">
            Grand Total: ₹{totalAmount.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
