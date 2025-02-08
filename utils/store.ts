import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../../type";

const prisma = new PrismaClient();

// Define CartProduct Interface
interface CartProduct extends ProductProps {
  quantity: number;
}

// Define UserType Interface
interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
}

// Define Store Type
interface StoreType {
  // User
  currentUser: UserType | null;
  isLoading: boolean;
  getUserInfo: (uid: string) => Promise<void>;

  // Cart
  cartProduct: CartProduct[];
  addToCart: (product: ProductProps) => Promise<void>;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  resetCart: () => void;

  // Favorite
  favoriteProduct: CartProduct[];
  addToFavorite: (product: ProductProps) => Promise<void>;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
}

// Custom Storage (Fixes localStorage issues on the server)
const customStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
};

// Zustand Store
export const store = create<StoreType>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct: [],

      // Fetch User Info from Prisma PostgreSQL
      getUserInfo: async (uid: string) => {
        if (!uid) {
          set({ currentUser: null, isLoading: false });
          return;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { id: uid },
          });

          if (user) {
            set({ currentUser: user, isLoading: false });
          } else {
            set({ currentUser: null, isLoading: false });
          }
        } catch (error) {
          console.error("getUserInfo error:", error);
          set({ currentUser: null, isLoading: false });
        }
      },

      // Add Product to Cart
      addToCart: (product: ProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const existingProduct = state.cartProduct.find(
              (p) => p._id === product._id
            );

            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                    : p
                ),
              };
            } else {
              return {
                cartProduct: [
                  ...state.cartProduct,
                  { ...product, quantity: 1 },
                ],
              };
            }
          });
          resolve();
        });
      },

      // Decrease Product Quantity
      decreaseQuantity: (productId: string) => {
        set((state: StoreType) => ({
          cartProduct: state.cartProduct.map((p) =>
            p._id === productId
              ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
              : p
          ),
        }));
      },

      // Remove Product from Cart
      removeFromCart: (productId: string) => {
        set((state: StoreType) => ({
          cartProduct: state.cartProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },

      // Reset Cart
      resetCart: () => {
        set({ cartProduct: [] });
      },

      // Add to Favorite
      addToFavorite: (product: ProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id
            );

            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id
                  )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },

      // Remove from Favorite
      removeFromFavorite: (productId: string) => {
        set((state: StoreType) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },

      // Reset Favorite
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "homepack-storage",
      storage: customStorage,
    }
  )
);
