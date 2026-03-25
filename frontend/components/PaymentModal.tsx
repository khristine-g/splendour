'use client'

import { useState } from 'react'
import { Loader2, ShieldCheck, X, Smartphone, CheckCircle } from 'lucide-react'

interface PaymentModalProps {
  amount: number
  isOpen: boolean
  onClose: () => void
  onConfirm: (phone: string) => Promise<void>
}

export default function PaymentModal({ amount, isOpen, onClose, onConfirm }: PaymentModalProps) {
  const [phone, setPhone] = useState('') // no filler
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    const fullPhone = `254${phone}`
    if (fullPhone.length < 12) return
    setLoading(true)
    try {
      await onConfirm(fullPhone)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-card w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00AC4E] p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Smartphone size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">M-PESA EXPRESS</h2>
              <p className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">
                Secure Payment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Amount */}
          <div className="text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Payable</p>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-foreground mt-1">
              <span className="text-lg font-semibold text-gray-500 dark:text-muted mr-1">KSh</span>
              {amount.toLocaleString()}
            </div>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-muted uppercase tracking-widest">
              Safaricom Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center bg-gray-100 dark:bg-muted border border-gray-200 dark:border-border rounded-2xl px-4 font-bold text-gray-500 dark:text-muted text-lg">
                +254
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="7XXXXXXXX"
                className="flex-1 px-5 py-4 bg-gray-50 dark:bg-card border border-gray-200 dark:border-border rounded-2xl font-bold text-lg text-gray-900 dark:text-foreground focus:outline-none focus:border-[#00AC4E] focus:bg-white dark:focus:bg-[#1f1f1f] transition"
              />
            </div>
            <p className="text-[10px] text-gray-400 dark:text-muted">The STK prompt will be sent to this number.</p>
          </div>

          {/* Confirm Button */}
          {/* Confirm Button */}
          {/* Confirm Button */}
<button
  onClick={handleSubmit}
  disabled={loading || phone.length < 9}
  className="w-full py-5 bg-primary text-primary-foreground font-bold text-base rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:opacity-95 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none transition"
>
  {loading ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>PROCESSING...</span>
    </>
  ) : (
    <>
      <span>CONFIRM & PAY</span>
      <CheckCircle size={20} className="text-[#00AC4E]" />
    </>
  )}
</button>

          {/* Trust Footer */}
          <div className="flex flex-col items-center mt-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-card rounded-full border border-gray-200 dark:border-border">
              <ShieldCheck size={14} className="text-[#00AC4E]" />
              <span className="text-[9px] font-bold text-gray-500 dark:text-muted uppercase tracking-tighter">
                Encrypted by IntaSend Gateway
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Animation */}
      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}