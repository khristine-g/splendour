// Notification types for the event management system
export type NotificationType = 
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_reminder'
  | 'payment_received'
  | 'payment_failed'
  | 'vendor_approved'
  | 'vendor_rejected'
  | 'review_received'
  | 'message_received'
  | 'system_alert'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: Date
  metadata?: Record<string, any>
}

// Email notification templates
export const EMAIL_TEMPLATES = {
  booking_confirmed: {
    subject: 'Booking Confirmed - Splendour Events',
    template: (data: any) => `
      <h1>Your Booking is Confirmed!</h1>
      <p>Dear ${data.clientName},</p>
      <p>Your booking for <strong>${data.serviceName}</strong> has been confirmed.</p>
      <p><strong>Event Date:</strong> ${data.eventDate}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p><strong>Vendor:</strong> ${data.vendorName}</p>
      <p><strong>Total Amount:</strong> $${data.total}</p>
      <p>We look forward to making your event special!</p>
      <p>Best regards,<br/>Splendour Events Team</p>
    `,
  },
  booking_cancelled: {
    subject: 'Booking Cancelled - Splendour Events',
    template: (data: any) => `
      <h1>Booking Cancelled</h1>
      <p>Dear ${data.clientName},</p>
      <p>Your booking for <strong>${data.serviceName}</strong> on ${data.eventDate} has been cancelled.</p>
      <p>If this was a mistake, please contact us immediately.</p>
      <p>Best regards,<br/>Splendour Events Team</p>
    `,
  },
  booking_reminder: {
    subject: 'Event Reminder - Splendour Events',
    template: (data: any) => `
      <h1>Your Event is Coming Up!</h1>
      <p>Dear ${data.clientName},</p>
      <p>This is a reminder that your event is scheduled for <strong>${data.eventDate}</strong>.</p>
      <p><strong>Service:</strong> ${data.serviceName}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br/>Splendour Events Team</p>
    `,
  },
  payment_received: {
    subject: 'Payment Received - Splendour Events',
    template: (data: any) => `
      <h1>Payment Received</h1>
      <p>Dear ${data.clientName},</p>
      <p>We have received your payment of <strong>$${data.amount}</strong>.</p>
      <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
      <p><strong>Service:</strong> ${data.serviceName}</p>
      <p>Thank you for choosing Splendour Events!</p>
      <p>Best regards,<br/>Splendour Events Team</p>
    `,
  },
  vendor_booking_request: {
    subject: 'New Booking Request - Splendour Events',
    template: (data: any) => `
      <h1>New Booking Request!</h1>
      <p>Dear ${data.vendorName},</p>
      <p>You have received a new booking request:</p>
      <p><strong>Service:</strong> ${data.serviceName}</p>
      <p><strong>Client:</strong> ${data.clientName}</p>
      <p><strong>Event Date:</strong> ${data.eventDate}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p>Please log in to your dashboard to accept or decline this request.</p>
      <p>Best regards,<br/>Splendour Events Team</p>
    `,
  },
}

// Mock in-app notifications
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'client-1',
    type: 'booking_confirmed',
    title: 'Booking Confirmed',
    message: 'Your photography booking for March 25, 2026 has been confirmed.',
    read: false,
    createdAt: new Date('2026-03-15T10:30:00'),
    metadata: { bookingId: 'booking-1' },
  },
  {
    id: 'notif-2',
    userId: 'client-1',
    type: 'payment_received',
    title: 'Payment Successful',
    message: 'We received your payment of $1,500. Thank you!',
    read: true,
    createdAt: new Date('2026-03-14T14:20:00'),
    metadata: { amount: 1500, transactionId: 'txn_123456' },
  },
  {
    id: 'notif-3',
    userId: 'vendor-1',
    type: 'message_received',
    title: 'New Message',
    message: 'Sarah Johnson sent you a message about their upcoming event.',
    read: false,
    createdAt: new Date('2026-03-15T09:15:00'),
    metadata: { senderId: 'client-1' },
  },
  {
    id: 'notif-4',
    userId: 'vendor-1',
    type: 'review_received',
    title: 'New Review',
    message: 'You received a 5-star review from a recent client!',
    read: false,
    createdAt: new Date('2026-03-13T16:45:00'),
    metadata: { rating: 5, reviewId: 'review-1' },
  },
]

// Helper functions
export function getNotificationsForUser(userId: string): Notification[] {
  return MOCK_NOTIFICATIONS.filter((n) => n.userId === userId)
}

export function getUnreadCount(userId: string): number {
  return MOCK_NOTIFICATIONS.filter((n) => n.userId === userId && !n.read).length
}

export function formatNotificationTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
