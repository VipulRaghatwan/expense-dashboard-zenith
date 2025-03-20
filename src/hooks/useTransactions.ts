
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  fetchTransactions, 
  fetchTransactionsByType, 
  addTransaction, 
  deleteTransaction,
  Transaction
} from '@/lib/api';

// Hook for fetching all transactions with real-time updates
export function useTransactions() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  // Set up real-time subscription
  useEffect(() => {
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions',
      }, () => {
        // Invalidate and refetch when data changes
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // Add transaction mutation
  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      toast.success('Transaction added successfully');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error) => {
      toast.error(`Failed to add transaction: ${error.message}`);
    },
  });

  // Delete transaction mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success('Transaction deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error) => {
      toast.error(`Failed to delete transaction: ${error.message}`);
    },
  });

  return {
    ...query,
    addTransaction: addTransactionMutation.mutate,
    deleteTransaction: deleteTransactionMutation.mutate,
    isAddingTransaction: addTransactionMutation.isPending,
    isDeletingTransaction: deleteTransactionMutation.isPending,
  };
}

// Hook for fetching transactions by type
export function useTransactionsByType(type: 'income' | 'expense') {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['transactions', type],
    queryFn: () => fetchTransactionsByType(type),
  });

  // Set up real-time subscription
  useEffect(() => {
    const subscription = supabase
      .channel(`${type}-changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions',
        filter: `type=eq.${type}`,
      }, () => {
        // Invalidate and refetch when data changes
        queryClient.invalidateQueries({ queryKey: ['transactions', type] });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, type]);

  return query;
}
