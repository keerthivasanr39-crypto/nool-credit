import React, { createContext, useContext, useState, useEffect } from 'react';
import { Invoice, InvoicePool, FinancingRequest, KYCState, NotificationItem } from '../types';
import { api } from '../services/api';

interface AppContextType {
  invoices: Invoice[];
  pools: InvoicePool[];
  requests: FinancingRequest[];
  kycState: KYCState | null;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  hideFinancials: boolean;
  isVoiceOpen: boolean;
  isLoading: boolean;
  toggleHideFinancials: () => void;
  openVoice: () => void;
  closeVoice: () => void;
  refreshData: () => Promise<void>;
  addInvoice: (invoice: Partial<Invoice>) => Promise<Invoice>;
  createPool: (invoiceIds: string[]) => Promise<InvoicePool>;
  submitFinancingRequest: (poolId: string, amount?: number) => Promise<FinancingRequest>;
  approveRequest: (requestId: string) => Promise<FinancingRequest>;
  rejectRequest: (requestId: string, reason: string) => Promise<FinancingRequest>;
  initiateDisbursement: (requestId: string) => Promise<FinancingRequest>;
  updateKYC: (step: keyof KYCState, data: any) => Promise<void>;
  markNotificationsRead: () => Promise<void>;
  resetAllDemoData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pools, setPools] = useState<InvoicePool[]>([]);
  const [requests, setRequests] = useState<FinancingRequest[]>([]);
  const [kycState, setKycState] = useState<KYCState | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [hideFinancials, setHideFinancials] = useState<boolean>(() => {
    return localStorage.getItem('nool_hide_financials') === 'true';
  });
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const [invData, poolData, reqData, kycData, notifData] = await Promise.all([
        api.getInvoices(),
        api.getPools(),
        api.getFinancingRequests(),
        api.getKYCState(),
        api.getNotifications()
      ]);
      setInvoices(invData);
      setPools(poolData);
      setRequests(reqData);
      setKycState(kycData);
      setNotifications(notifData);
    } catch (e) {
      console.error('Failed to load application data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const toggleHideFinancials = () => {
    setHideFinancials(prev => {
      const next = !prev;
      localStorage.setItem('nool_hide_financials', String(next));
      return next;
    });
  };

  const openVoice = () => setIsVoiceOpen(true);
  const closeVoice = () => setIsVoiceOpen(false);

  const addInvoice = async (data: Partial<Invoice>) => {
    const created = await api.addInvoice(data);
    await refreshData();
    return created;
  };

  const createPool = async (invoiceIds: string[]) => {
    const created = await api.createPool(invoiceIds);
    await refreshData();
    return created;
  };

  const submitFinancingRequest = async (poolId: string, amount?: number) => {
    const created = await api.submitFinancingRequest(poolId, amount);
    await refreshData();
    return created;
  };

  const approveRequest = async (requestId: string) => {
    const approved = await api.approveRequest(requestId);
    await refreshData();
    return approved;
  };

  const rejectRequest = async (requestId: string, reason: string) => {
    const rejected = await api.rejectRequest(requestId, reason);
    await refreshData();
    return rejected;
  };

  const initiateDisbursement = async (requestId: string) => {
    const updated = await api.initiateDisbursement(requestId);
    await refreshData();
    return updated;
  };

  const updateKYC = async (step: keyof KYCState, data: any) => {
    const updated = await api.updateKYCState(step, data);
    setKycState(updated);
  };

  const markNotificationsRead = async () => {
    await api.markNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetAllDemoData = async () => {
    await api.resetDemoData();
    await refreshData();
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        invoices,
        pools,
        requests,
        kycState,
        notifications,
        unreadNotificationCount,
        hideFinancials,
        isVoiceOpen,
        isLoading,
        toggleHideFinancials,
        openVoice,
        closeVoice,
        refreshData,
        addInvoice,
        createPool,
        submitFinancingRequest,
        approveRequest,
        rejectRequest,
        initiateDisbursement,
        updateKYC,
        markNotificationsRead,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
