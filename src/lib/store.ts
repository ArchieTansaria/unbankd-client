
import { create } from 'zustand';

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string;
  setConnected: (connected: boolean) => void;
  setAddress: (address: string | null) => void;
  setBalance: (balance: string) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  address: null,
  balance: '0',
  setConnected: (connected) => set({ connected }),
  setAddress: (address) => set({ address }),
  setBalance: (balance) => set({ balance }),
}));

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

interface LoanState {
  loans: any[];
  myLoans: any[];
  addLoan: (loan: any) => void;
  removeLoan: (id: string) => void;
  setLoans: (loans: any[]) => void;
  setMyLoans: (loans: any[]) => void;
}

export const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  myLoans: [],
  addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
  removeLoan: (id) => set((state) => ({ 
    loans: state.loans.filter(loan => loan.id !== id)
  })),
  setLoans: (loans) => set({ loans }),
  setMyLoans: (myLoans) => set({ myLoans }),
}));

interface UserState {
  user: {
    name: string | null;
    email: string | null;
    age: string | null;
    isLoggedIn: boolean;
  };
  setUser: (user: Partial<UserState['user']>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: null,
    email: null,
    age: null,
    isLoggedIn: false,
  },
  setUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),
  logout: () => set({
    user: {
      name: null,
      email: null,
      age: null,
      isLoggedIn: false,
    }
  }),
}));
