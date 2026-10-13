import React, { useMemo, useState } from "react";
import {
  Car,
  User,
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Star,
  Search,
  Plus,
  Trash2,
  Phone,
  Users,
  Wallet,
  Bell,
  LogOut,
  Lock,
  History,
  Edit3,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  FileCheck,
  MessageSquare,
  Moon,
  Sun,
  Camera,
} from "lucide-react";

const initialUsers = [
  { id: 1, name: "Sreylenn", phone: "012 345 678", email: "user@gmail.com", password: "123456", status: "Active", profileImage: "" },
  { id: 2, name: "Dalin", phone: "098 111 222", email: "dalin@example.com", password: "123456", status: "Active", profileImage: "" },
];

const initialDrivers = [
  { id: 1, name: "Driver Dara", phone: "010 222 333", email: "driver@gmail.com", password: "123456", status: "Available", rating: 4.8, verificationStatus: "Verified", profileImage: "" },
  { id: 2, name: "Driver Sokha", phone: "011 444 555", email: "sokha@example.com", password: "123456", status: "Available", rating: 4.6, verificationStatus: "Verified", profileImage: "" },
  { id: 3, name: "Driver Lina", phone: "088 777 999", email: "lina@example.com", password: "123456", status: "Offline", rating: 5, verificationStatus: "Pending", profileImage: "" },
];

const initialTaxis = [
  { id: 1, driverId: 1, carModel: "Toyota Prius", plate: "PP-2A-8899", carType: "Normal Car", status: "Active", imageUrl: "" },
  { id: 2, driverId: 2, carModel: "Highlander", plate: "PP-3B-7788", carType: "SUV", status: "Active", imageUrl: "" },
  { id: 3, driverId: null, carModel: "PassApp Tuk Tuk", plate: "PP-1T-1200", carType: "Tuk Tuk", status: "Active", imageUrl: "" },
];

const adminAccount = { id: 1, name: "Admin", email: "admin@gmail.com", password: "admin123", role: "admin", profileImage: "" };

const initialBookings = [
  { id: 1001, customerId: 1, customer: "Sreylenn", pickup: "CADT", destination: "Aeon Mall Phnom Penh", date: "2026-05-22", time: "10:30", carType: "Normal Car", passengers: 2, status: "Pending", driverId: null, taxiId: null, driver: "Not assigned", paymentMethod: "Cash", paymentStatus: "Unpaid", paymentProof: "", price: 6, rating: null, review: "", cancelReason: "", rejectReason: "" },
  { id: 1002, customerId: 2, customer: "Dalin", pickup: "TK Avenue", destination: "Royal Palace", date: "2026-05-21", time: "15:20", carType: "SUV", passengers: 3, status: "Completed", driverId: 2, taxiId: 2, driver: "Driver Sokha", paymentMethod: "ABA QR", paymentStatus: "Verified", paymentProof: "TXN-ABA-8821", price: 10, rating: 5, review: "Smooth ride", cancelReason: "", rejectReason: "" },
];

const initialHistory = [
  { id: 1, bookingId: 1001, status: "Pending", actor: "System", note: "Booking created", createdAt: "2026-05-22 10:00" },
  { id: 2, bookingId: 1002, status: "Pending", actor: "System", note: "Booking created", createdAt: "2026-05-21 15:00" },
  { id: 3, bookingId: 1002, status: "Assigned", actor: "Admin", note: "Driver assigned", createdAt: "2026-05-21 15:05" },
  { id: 4, bookingId: 1002, status: "Accepted", actor: "Driver Sokha", note: "Driver accepted", createdAt: "2026-05-21 15:08" },
  { id: 5, bookingId: 1002, status: "Driver Arrived", actor: "Driver Sokha", note: "Driver arrived at pickup", createdAt: "2026-05-21 15:20" },
  { id: 6, bookingId: 1002, status: "In Progress", actor: "Driver Sokha", note: "Trip started", createdAt: "2026-05-21 15:25" },
  { id: 7, bookingId: 1002, status: "Completed", actor: "Driver Sokha", note: "Trip completed", createdAt: "2026-05-21 15:55" },
];

const initialPayments = [
  { id: 1, bookingId: 1002, amount: 10, currency: "USD", method: "ABA Pay", status: "Verified", transactionId: "TXN-ABA-8821", proof: "ABA transfer confirmed", providerRef: "ABA-8821", verificationType: "Manual Admin Review", paidAt: "2026-05-21 15:56", verifiedAt: "2026-05-21 16:00", customerFee: 0, netAmount: 10 },
];

const initialEarnings = [
  { id: 1, driverId: 2, bookingId: 1002, amount: 8, platformFee: 2, createdAt: "2026-05-21 15:56" },
];

const initialComplaints = [
  { id: 1, bookingId: 1002, customerId: 2, type: "Review", message: "Smooth ride", status: "Reviewed", adminReply: "Thank you for your feedback. We are glad you had a smooth ride.", repliedAt: "2026-05-21 16:10" },
];

export default function TaxiBookingV3Prototype() {
  const [authRole, setAuthRole] = useState("user");
  const [authMode, setAuthMode] = useState("login");
  const [session, setSession] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [taxis, setTaxis] = useState(initialTaxis);
  const [bookings, setBookings] = useState(initialBookings);
  const [payments, setPayments] = useState(initialPayments);
  const [statusHistory, setStatusHistory] = useState(initialHistory);
  const [earnings, setEarnings] = useState(initialEarnings);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState("Version 3 ready. Demo: user@gmail.com / 123456, driver@gmail.com / 123456, admin@gmail.com / admin123");
  const [loginForm, setLoginForm] = useState({ email: "user@gmail.com", password: "123456" });
  const [registerForm, setRegisterForm] = useState({ name: "", phone: "", email: "", password: "", profileImage: "", carModel: "", plate: "", carType: "Normal Car" });
  const [bookingForm, setBookingForm] = useState({ pickup: "", destination: "", date: "", time: "", carType: "Normal Car", passengers: 1, paymentMethod: "Cash", taxiId: "", paymentProof: "", transactionId: "", cardLast4: "", cardHolder: "", billingPhone: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [reasonForm, setReasonForm] = useState({ bookingId: null, type: "", reason: "" });
  const [feedbackForm, setFeedbackForm] = useState({ bookingId: null, type: "", rating: 5, message: "" });
  const [adminReplyForm, setAdminReplyForm] = useState({ complaintId: null, message: "" });
  const [newTaxi, setNewTaxi] = useState({ driverId: "", carModel: "", plate: "", carType: "Normal Car", status: "Active", imageUrl: "" });

  const currentUser = session?.role === "user" ? users.find((u) => u.id === session.id) : null;
  const currentDriver = session?.role === "driver" ? drivers.find((d) => d.id === session.id) : null;

  const filteredBookings = useMemo(() => bookings.filter((b) => {
    const text = `${b.id} ${b.customer} ${b.pickup} ${b.destination} ${b.driver} ${b.status}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (statusFilter === "All" || b.status === statusFilter);
  }), [bookings, search, statusFilter]);

  const analytics = useMemo(() => {
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
    const revenue = payments.filter((p) => p.status === "Verified").reduce((s, p) => s + p.amount, 0);
    const avgRating = bookings.filter((b) => b.rating).reduce((s, b, _, arr) => s + b.rating / arr.length, 0) || 0;
    return { completed, cancelled, revenue, avgRating };
  }, [bookings, payments]);

  const login = () => {
    if (authRole === "admin") {
      if (loginForm.email === adminAccount.email && loginForm.password === adminAccount.password) return setSession(adminAccount);
      return setNotice("Invalid admin login.");
    }
    const list = authRole === "user" ? users : drivers;
    const account = list.find((a) => a.email === loginForm.email && a.password === loginForm.password);
    if (!account) return setNotice("Invalid email or password.");
    if (account.status === "Blocked") return setNotice("This account is blocked.");
    setSession({ ...account, role: authRole });
    setNotice(`${account.name} logged in.`);
  };

  const register = () => {
    if (!registerForm.name || !registerForm.phone || !registerForm.email || !registerForm.password) return setNotice("Please fill all required fields.");
    if (authRole === "user") {
      const user = { id: nextId(users), name: registerForm.name, phone: registerForm.phone, email: registerForm.email, password: registerForm.password, profileImage: registerForm.profileImage, status: "Active" };
      setUsers([...users, user]);
      setSession({ ...user, role: "user" });
      return setNotice("User registered.");
    }
    if (!registerForm.carModel || !registerForm.plate) return setNotice("Driver must add taxi information.");
    const driver = { id: nextId(drivers), name: registerForm.name, phone: registerForm.phone, email: registerForm.email, password: registerForm.password, profileImage: registerForm.profileImage, status: "Offline", rating: 5, verificationStatus: "Pending" };
    const taxi = { id: nextId(taxis), driverId: driver.id, carModel: registerForm.carModel, plate: registerForm.plate, carType: registerForm.carType, status: "Active", imageUrl: "" };
    setDrivers([...drivers, driver]);
    setTaxis([...taxis, taxi]);
    setSession({ ...driver, role: "driver" });
    setNotice("Driver registered. Admin verification is required before accepting trips.");
  };

  const addHistory = (bookingId, status, actor, note) => setStatusHistory((prev) => [{ id: nextId(prev), bookingId, status, actor, note, createdAt: now() }, ...prev]);
  const notify = (role, userId, message) => setNotifications((prev) => [{ id: nextId(prev), role, userId, message, read: false, createdAt: now() }, ...prev]);

  const validateBooking = () => {
    if (!bookingForm.pickup || !bookingForm.destination || !bookingForm.date || !bookingForm.time) return "Please fill pickup, destination, date, and time.";
    if (bookingForm.pickup.trim().toLowerCase() === bookingForm.destination.trim().toLowerCase()) return "Pickup and destination cannot be the same.";
    return "";
  };

  const requestBookingConfirmation = () => {
    const error = validateBooking();
    if (error) return setNotice(error);
    setShowConfirm(true);
  };

  const createBooking = () => {
    const selectedTaxi = taxis.find((t) => t.id === Number(bookingForm.taxiId));
    const selectedDriver = selectedTaxi?.driverId ? drivers.find((d) => d.id === selectedTaxi.driverId) : null;
    const price = calculatePrice(bookingForm.carType, Number(bookingForm.passengers));
    const paymentStatus = initialPaymentStatus(bookingForm.paymentMethod);
    const booking = { id: nextId(bookings, 1001), customerId: currentUser.id, customer: currentUser.name, ...bookingForm, passengers: Number(bookingForm.passengers), taxiId: selectedTaxi?.id || null, status: "Pending", driverId: null, driver: selectedDriver ? `${selectedDriver.name} (preferred)` : "Not assigned", paymentStatus, price, rating: null, review: "", cancelReason: "", rejectReason: "" };
    const payment = buildPaymentRecord(nextId(payments), booking, price);
    setBookings([booking, ...bookings]);
    setPayments([payment, ...payments]);
    addHistory(booking.id, "Pending", currentUser.name, "Customer confirmed booking");
    notify("admin", 1, `New booking #${booking.id} is waiting.`);
    setBookingForm({ pickup: "", destination: "", date: "", time: "", carType: "Normal Car", passengers: 1, paymentMethod: "Cash", taxiId: "", paymentProof: "", transactionId: "", cardLast4: "", cardHolder: "", billingPhone: "" });
    setShowConfirm(false);
    setNotice(`Booking #${booking.id} created.`);
  };

  const changeBookingStatus = (bookingId, status, actor, note, driverId = null, extra = {}) => {
    const driver = driverId ? drivers.find((d) => d.id === Number(driverId)) : currentDriver;
    if (session?.role === "driver") {
      if (currentDriver.status === "Offline") return setNotice("You must be online before accepting or updating trips.");
      if (currentDriver.verificationStatus !== "Verified") return setNotice("Admin must verify your driver account first.");
    }
    const taxi = driver ? taxis.find((t) => t.driverId === driver.id) : null;
    setBookings(bookings.map((b) => {
      if (b.id !== bookingId) return b;
      const assigned = driver && ["Assigned", "Accepted", "Driver Arrived", "In Progress", "Completed"].includes(status);
      return { ...b, status, driverId: assigned ? driver.id : b.driverId, taxiId: assigned ? taxi?.id || b.taxiId : b.taxiId, driver: assigned ? driver.name : b.driver, paymentStatus: status === "Completed" ? completedPaymentStatus(b.paymentMethod) : b.paymentStatus, ...extra };
    }));
    addHistory(bookingId, status, actor, note);
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) notify("user", booking.customerId, `Booking #${bookingId} updated to ${status}.`);
    if (driver) setDrivers(drivers.map((d) => d.id === driver.id ? { ...d, status: ["Completed", "Rejected", "Cancelled"].includes(status) ? "Available" : "Busy" } : d));
    if (status === "Completed") completePaymentAndEarning(bookingId, driver?.id);
    setNotice(`Booking #${bookingId} updated to ${status}.`);
  };

  const completePaymentAndEarning = (bookingId, driverId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;
    setPayments((prev) => {
      const exists = prev.some((p) => p.bookingId === bookingId);
      if (exists) return prev.map((p) => p.bookingId === bookingId ? { ...p, status: completedPaymentStatus(booking.paymentMethod), paidAt: p.paidAt || now(), verifiedAt: now(), netAmount: p.amount - (p.customerFee || 0) } : p);
      return [{ ...buildPaymentRecord(nextId(prev), booking, booking.price), status: completedPaymentStatus(booking.paymentMethod), proof: booking.paymentProof || "Cash received", paidAt: now(), verifiedAt: now() }, ...prev];
    });
    if (driverId && !earnings.some((e) => e.bookingId === bookingId)) setEarnings((prev) => [{ id: nextId(prev), driverId, bookingId, amount: booking.price * 0.8, platformFee: booking.price * 0.2, createdAt: now() }, ...prev]);
  }; 

  const submitReason = () => {
    if (!reasonForm.reason) return setNotice("Please choose a reason first.");
    if (reasonForm.type === "cancel") changeBookingStatus(reasonForm.bookingId, "Cancelled", currentUser?.name || "Customer", `Cancel reason: ${reasonForm.reason}`, null, { cancelReason: reasonForm.reason });
    if (reasonForm.type === "reject") changeBookingStatus(reasonForm.bookingId, "Rejected", currentDriver?.name || "Driver", `Reject reason: ${reasonForm.reason}`, currentDriver?.id, { rejectReason: reasonForm.reason });
    setReasonForm({ bookingId: null, type: "", reason: "" });
  };

  const rateDriver = (id, rating, message) => {
    const finalMessage = message.trim() || "No feedback message provided.";
    setBookings(bookings.map((b) => b.id === id ? { ...b, rating, review: finalMessage } : b));
    const booking = bookings.find((b) => b.id === id);
    if (booking) setComplaints([{ id: nextId(complaints), bookingId: id, customerId: booking.customerId, type: "Review", message: finalMessage, status: "Reviewed", adminReply: "", repliedAt: "" }, ...complaints]);
    setNotice(`Review submitted for booking #${id}.`);
  };

  const submitComplaint = (bookingId, message) => {
    const finalMessage = message.trim() || "No complaint message provided.";
    const booking = bookings.find((b) => b.id === bookingId);
    setComplaints([{ id: nextId(complaints), bookingId, customerId: booking?.customerId, type: "Complaint", message: finalMessage, status: "Open", adminReply: "", repliedAt: "" }, ...complaints]);
    setNotice("Complaint submitted to admin.");
  };

  const submitFeedback = () => {
    if (!feedbackForm.message.trim()) return setNotice("Please write your feedback message first.");
    if (feedbackForm.type === "review") rateDriver(feedbackForm.bookingId, Number(feedbackForm.rating), feedbackForm.message);
    if (feedbackForm.type === "complaint") submitComplaint(feedbackForm.bookingId, feedbackForm.message);
    setFeedbackForm({ bookingId: null, type: "", rating: 5, message: "" });
  }; 

  const updateProfile = (data) => {
    if (session.role === "user") setUsers(users.map((u) => u.id === session.id ? { ...u, ...data } : u));
    if (session.role === "driver") setDrivers(drivers.map((d) => d.id === session.id ? { ...d, ...data } : d));
    setSession({ ...session, ...data });
  };

  const toggleDriverOnline = () => {
    if (currentDriver.verificationStatus !== "Verified") return setNotice("You cannot go online until admin verifies your account.");
    const next = currentDriver.status === "Offline" ? "Available" : "Offline";
    setDrivers(drivers.map((d) => d.id === currentDriver.id ? { ...d, status: next } : d));
    setNotice(`Driver is now ${next}.`);
  };

  const assignDriver = (bookingId, driverId) => changeBookingStatus(bookingId, "Assigned", "Admin", "Admin assigned driver", driverId);
  const verifyDriver = (id, status) => setDrivers(drivers.map((d) => d.id === id ? { ...d, verificationStatus: status, status: status === "Verified" ? "Available" : "Offline" } : d));
  const verifyPayment = (paymentId, status) => {
    const payment = payments.find((p) => p.id === paymentId);
    setPayments(payments.map((p) => p.id === paymentId ? { ...p, status, verifiedAt: status === "Verified" ? now() : p.verifiedAt, rejectedAt: status === "Rejected" ? now() : p.rejectedAt } : p));
    if (payment) setBookings(bookings.map((b) => b.id === payment.bookingId ? { ...b, paymentStatus: status } : b));
    setNotice(`Payment #${paymentId} marked as ${status}.`);
  }; 
  const resolveComplaint = (id) => setComplaints(complaints.map((c) => c.id === id ? { ...c, status: "Resolved" } : c));
  const replyToComplaint = (id, message) => {
    if (!message.trim()) return setNotice("Please write a reply message first.");
    const target = complaints.find((c) => c.id === id);
    setComplaints(complaints.map((c) => c.id === id ? { ...c, adminReply: message.trim(), repliedAt: now(), status: c.type === "Complaint" ? "Replied" : c.status } : c));
    if (target) notify("user", target.customerId, `Admin replied to your ${target.type.toLowerCase()} for booking #${target.bookingId}.`);
    setAdminReplyForm({ complaintId: null, message: "" });
    setNotice("Reply sent to customer.");
  }; 
  const toggleUserStatus = (id) => setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
  const deleteBooking = (id) => setBookings(bookings.filter((b) => b.id !== id));
  const addTaxi = () => { if (!newTaxi.carModel || !newTaxi.plate) return setNotice("Please fill taxi model and plate."); setTaxis([...taxis, { id: nextId(taxis), ...newTaxi, driverId: newTaxi.driverId ? Number(newTaxi.driverId) : null }]); setNewTaxi({ driverId: "", carModel: "", plate: "", carType: "Normal Car", status: "Active", imageUrl: "" }); };

  if (!session) return <AuthScreen authRole={authRole} setAuthRole={setAuthRole} authMode={authMode} setAuthMode={setAuthMode} loginForm={loginForm} setLoginForm={setLoginForm} registerForm={registerForm} setRegisterForm={setRegisterForm} login={login} register={register} notice={notice} darkMode={darkMode} setDarkMode={setDarkMode} />;

  const myNotifications = notifications.filter((n) => n.role === session.role && (!n.userId || n.userId === session.id));

  return <div className={`${darkMode ? "dark" : ""}`}><div className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-6"><div className="mx-auto max-w-7xl space-y-6"><header className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Version 3 • Logged in as {session.role}</p><h1 className="mt-1 text-3xl font-bold">Welcome, {session.name}</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Confirmation, driver arrived, cancellation reasons, verification, payments, and complaints.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-100">{darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {darkMode ? "Light" : "Dark"} Mode</button><button onClick={() => setSession(null)} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"><LogOut className="h-4 w-4" /> Logout</button></div></div></header><Notice notice={notice} />{myNotifications.length > 0 && <NotificationPanel notifications={myNotifications} />}{session.role === "user" && <UserDashboard currentUser={currentUser} updateProfile={updateProfile} bookingForm={bookingForm} setBookingForm={setBookingForm} requestBookingConfirmation={requestBookingConfirmation} bookings={filteredBookings.filter((b) => b.customerId === currentUser?.id)} complaints={complaints.filter((c) => c.customerId === currentUser?.id)} taxis={taxis} drivers={drivers} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} openCancel={(id) => setReasonForm({ bookingId: id, type: "cancel", reason: "" })} openFeedback={(id, type) => setFeedbackForm({ bookingId: id, type, rating: 5, message: "" })} statusHistory={statusHistory} />}{session.role === "driver" && <DriverDashboard currentDriver={currentDriver} taxi={taxis.find((t) => t.driverId === currentDriver?.id)} updateProfile={updateProfile} toggleDriverOnline={toggleDriverOnline} bookings={filteredBookings.filter((b) => !b.driverId || b.driverId === currentDriver?.id)} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} changeBookingStatus={changeBookingStatus} openReject={(id) => setReasonForm({ bookingId: id, type: "reject", reason: "" })} earnings={earnings.filter((e) => e.driverId === currentDriver?.id)} statusHistory={statusHistory} />}{session.role === "admin" && <AdminDashboard users={users} drivers={drivers} taxis={taxis} bookings={bookings} filteredBookings={filteredBookings} payments={payments} complaints={complaints} analytics={analytics} statusHistory={statusHistory} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} toggleUserStatus={toggleUserStatus} verifyDriver={verifyDriver} assignDriver={assignDriver} deleteBooking={deleteBooking} verifyPayment={verifyPayment} resolveComplaint={resolveComplaint} openAdminReply={(id) => setAdminReplyForm({ complaintId: id, message: "" })} newTaxi={newTaxi} setNewTaxi={setNewTaxi} addTaxi={addTaxi} />}{showConfirm && <ConfirmBookingModal bookingForm={bookingForm} taxis={taxis} drivers={drivers} onClose={() => setShowConfirm(false)} onConfirm={createBooking} />}{reasonForm.bookingId && <ReasonModal reasonForm={reasonForm} setReasonForm={setReasonForm} onClose={() => setReasonForm({ bookingId: null, type: "", reason: "" })} onSubmit={submitReason} />}{feedbackForm.bookingId && <FeedbackModal feedbackForm={feedbackForm} setFeedbackForm={setFeedbackForm} onClose={() => setFeedbackForm({ bookingId: null, type: "", rating: 5, message: "" })} onSubmit={submitFeedback} />}{adminReplyForm.complaintId && <AdminReplyModal adminReplyForm={adminReplyForm} setAdminReplyForm={setAdminReplyForm} onClose={() => setAdminReplyForm({ complaintId: null, message: "" })} onSubmit={() => replyToComplaint(adminReplyForm.complaintId, adminReplyForm.message)} />}</div></div></div>;
}

function AuthScreen({ authRole, setAuthRole, authMode, setAuthMode, loginForm, setLoginForm, registerForm, setRegisterForm, login, register, notice, darkMode, setDarkMode }) { return <div className={`${darkMode ? "dark" : ""}`}><div className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-6"><div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2"><section className="rounded-3xl bg-slate-900 p-8 text-white"><p className="text-sm font-semibold text-blue-300">Taxi Booking System</p><h1 className="mt-3 text-4xl font-bold">Version 3 Prototype</h1><p className="mt-4 text-slate-300">Demo accounts: user@gmail.com / 123456, driver@gmail.com / 123456, admin@gmail.com / admin123</p></section><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><div className="mb-4 flex justify-end"><button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-100">{darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {darkMode ? "Light" : "Dark"} Mode</button></div><div className="flex flex-wrap gap-2"><RoleButton active={authRole === "user"} onClick={() => { setAuthRole("user"); setLoginForm({ email: "user@gmail.com", password: "123456" }); }} icon={<User />} label="User" /><RoleButton active={authRole === "driver"} onClick={() => { setAuthRole("driver"); setLoginForm({ email: "driver@gmail.com", password: "123456" }); }} icon={<Car />} label="Driver" /><RoleButton active={authRole === "admin"} onClick={() => { setAuthRole("admin"); setAuthMode("login"); setLoginForm({ email: "admin@gmail.com", password: "admin123" }); }} icon={<Shield />} label="Admin" /></div><div className="mt-5 flex gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800"><button onClick={() => setAuthMode("login")} className={`flex-1 rounded-xl p-2 text-sm font-medium ${authMode === "login" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-300"}`}>Login</button><button disabled={authRole === "admin"} onClick={() => setAuthMode("register")} className={`flex-1 rounded-xl p-2 text-sm font-medium ${authMode === "register" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-300"} ${authRole === "admin" ? "opacity-40" : ""}`}>Register</button></div><Notice notice={notice} />{authMode === "login" ? <div className="mt-5 space-y-3"><Input label="Email" value={loginForm.email} onChange={(v) => setLoginForm({ ...loginForm, email: v })} /><Input label="Password" type="password" value={loginForm.password} onChange={(v) => setLoginForm({ ...loginForm, password: v })} /><button onClick={login} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900"><Lock className="h-4 w-4" /> Login</button></div> : <div className="mt-5 space-y-3"><Input label="Full name" value={registerForm.name} onChange={(v) => setRegisterForm({ ...registerForm, name: v })} /><Input label="Phone" value={registerForm.phone} onChange={(v) => setRegisterForm({ ...registerForm, phone: v })} /><Input label="Email" value={registerForm.email} onChange={(v) => setRegisterForm({ ...registerForm, email: v })} /><Input label="Password" type="password" value={registerForm.password} onChange={(v) => setRegisterForm({ ...registerForm, password: v })} /><Input label="Profile picture URL" value={registerForm.profileImage} onChange={(v) => setRegisterForm({ ...registerForm, profileImage: v })} placeholder="Paste image URL or leave empty" />{authRole === "driver" && <div className="grid gap-3 md:grid-cols-2"><Input label="Car model" value={registerForm.carModel} onChange={(v) => setRegisterForm({ ...registerForm, carModel: v })} /><Input label="Plate number" value={registerForm.plate} onChange={(v) => setRegisterForm({ ...registerForm, plate: v })} /><Select label="Taxi type" value={registerForm.carType} onChange={(v) => setRegisterForm({ ...registerForm, carType: v })} options={carTypes()} /></div>}<button onClick={register} className="w-full rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900">Create Account</button></div>}</section></div></div></div>; }

function UserDashboard({ currentUser, updateProfile, bookingForm, setBookingForm, requestBookingConfirmation, bookings, complaints, taxis, drivers, search, setSearch, statusFilter, setStatusFilter, openCancel, openFeedback, statusHistory }) { const availableTaxis = taxis.filter((t) => t.status === "Active"); return <div className="grid gap-6 lg:grid-cols-5"><section className="space-y-6 lg:col-span-2"><ProfileCard person={currentUser} updateProfile={updateProfile} /><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Browse Taxis" description="Choose a taxi before booking." /><div className="mt-4 space-y-3">{availableTaxis.map((taxi) => { const driver = drivers.find((d) => d.id === taxi.driverId); const selected = Number(bookingForm.taxiId) === taxi.id; return <button key={taxi.id} onClick={() => setBookingForm({ ...bookingForm, taxiId: taxi.id, carType: taxi.carType })} className={`w-full overflow-hidden rounded-2xl border text-left ${selected ? "border-slate-900 bg-slate-50" : "border-slate-200"}`}><CarImagePlaceholder taxi={taxi} /><div className="p-4"><div className="flex justify-between gap-3"><div><p className="font-semibold">{taxi.carModel}</p><p className="text-sm text-slate-500 dark:text-slate-400">{taxi.carType} • {taxi.plate}</p><p className="text-sm text-slate-500 dark:text-slate-400">{driver ? `${driver.name} • ⭐ ${driver.rating}` : "No driver assigned"}</p></div><StatusBadge status={driver?.status || "Unassigned"} /></div><p className="mt-3 text-sm font-semibold">Estimated: ${calculatePrice(taxi.carType, Number(bookingForm.passengers || 1)).toFixed(2)}</p></div></button>; })}</div></section><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Book Taxi" description="Fill details, then confirm booking." /><div className="mt-5 space-y-3"><Input label="Pickup location" value={bookingForm.pickup} onChange={(v) => setBookingForm({ ...bookingForm, pickup: v })} /><Input label="Destination" value={bookingForm.destination} onChange={(v) => setBookingForm({ ...bookingForm, destination: v })} /><div className="grid grid-cols-2 gap-3"><Input label="Date" type="date" value={bookingForm.date} onChange={(v) => setBookingForm({ ...bookingForm, date: v })} /><Input label="Time" type="time" value={bookingForm.time} onChange={(v) => setBookingForm({ ...bookingForm, time: v })} /></div><Select label="Car type" value={bookingForm.carType} onChange={(v) => setBookingForm({ ...bookingForm, carType: v, taxiId: "" })} options={carTypes()} /><Input label="Passengers" type="number" value={bookingForm.passengers} onChange={(v) => setBookingForm({ ...bookingForm, passengers: v })} /><Select label="Payment method" value={bookingForm.paymentMethod} onChange={(v) => setBookingForm({ ...bookingForm, paymentMethod: v, paymentProof: "", transactionId: "", cardLast4: "", cardHolder: "", billingPhone: "" })} options={paymentMethods()} /><PaymentMethodFields bookingForm={bookingForm} setBookingForm={setBookingForm} /><button onClick={requestBookingConfirmation} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900"><Plus className="h-4 w-4" /> Review & Confirm</button></div></section></section><section className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-3"><PanelHeader title="Booking History" description="Cancel with reason, rate driver, or submit complaint." />{complaints.length > 0 && <CustomerRepliesPanel complaints={complaints} />}<SearchFilter search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} /><div className="mt-4 space-y-4">{bookings.map((b) => <BookingCard key={b.id} booking={b} history={statusHistory.filter((h) => h.bookingId === b.id)}><div className="mt-4 flex flex-wrap gap-2">{!["Completed", "Cancelled", "Rejected"].includes(b.status) && <ActionButton label="Cancel" tone="red" onClick={() => openCancel(b.id)} icon={<XCircle />} />}{b.status === "Completed" && !b.rating && <ActionButton label="Rate Driver" tone="yellow" onClick={() => openFeedback(b.id, "review")} icon={<Star />} />}{b.status === "Completed" && <ActionButton label="Complain" tone="red" onClick={() => openFeedback(b.id, "complaint")} icon={<AlertTriangle />} />}</div></BookingCard>)}</div></section></div>; }

function DriverDashboard({ currentDriver, taxi, updateProfile, toggleDriverOnline, bookings, search, setSearch, statusFilter, setStatusFilter, changeBookingStatus, openReject, earnings, statusHistory }) { const total = earnings.reduce((s, e) => s + e.amount, 0); return <div className="grid gap-6 lg:grid-cols-4"><section className="space-y-6"><ProfileCard person={currentDriver} updateProfile={updateProfile} /><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Driver Status" description="Must be verified and online to accept trips." /><button onClick={toggleDriverOnline} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3 text-white">{currentDriver?.status === "Offline" ? <ToggleLeft /> : <ToggleRight />} {currentDriver?.status}</button><div className="mt-4 rounded-2xl border border-slate-200 p-4 text-sm dark:border-slate-700 dark:bg-slate-800"><p className="font-semibold">Taxi</p><p className="text-slate-500 dark:text-slate-400">{taxi?.carModel || "No taxi"} • {taxi?.plate || "N/A"}</p><p className="text-slate-500 dark:text-slate-400">Verification: {currentDriver?.verificationStatus}</p><p className="text-slate-500 dark:text-slate-400">Rating: ⭐ {currentDriver?.rating}</p></div></section><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Earnings" description="Net earning after platform fee." /><p className="mt-4 text-3xl font-bold">${total.toFixed(2)}</p><p className="text-sm text-slate-500 dark:text-slate-400">Completed trips: {earnings.length}</p></section></section><section className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-3"><PanelHeader title="Trip Operations" description="Accept, arrive, start, complete, or reject with reason." /><SearchFilter search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} /><div className="mt-4 space-y-4">{bookings.map((b) => <BookingCard key={b.id} booking={b} history={statusHistory.filter((h) => h.bookingId === b.id)}><div className="mt-4 flex flex-wrap gap-2">{b.status === "Pending" && <ActionButton label="Accept" tone="blue" onClick={() => changeBookingStatus(b.id, "Accepted", currentDriver.name, "Driver accepted booking", currentDriver.id)} icon={<CheckCircle />} />}{b.status === "Assigned" && b.driverId === currentDriver?.id && <ActionButton label="Accept Assignment" tone="blue" onClick={() => changeBookingStatus(b.id, "Accepted", currentDriver.name, "Driver accepted assignment", currentDriver.id)} icon={<CheckCircle />} />}{b.status === "Accepted" && b.driverId === currentDriver?.id && <ActionButton label="Driver Arrived" tone="blue" onClick={() => changeBookingStatus(b.id, "Driver Arrived", currentDriver.name, "Driver arrived at pickup", currentDriver.id)} icon={<MapPin />} />}{b.status === "Driver Arrived" && b.driverId === currentDriver?.id && <ActionButton label="Start Trip" tone="blue" onClick={() => changeBookingStatus(b.id, "In Progress", currentDriver.name, "Trip started", currentDriver.id)} icon={<Car />} />}{b.status === "In Progress" && b.driverId === currentDriver?.id && <ActionButton label="Complete Trip" tone="green" onClick={() => changeBookingStatus(b.id, "Completed", currentDriver.name, "Trip completed", currentDriver.id)} icon={<CheckCircle />} />}{!["Completed", "Cancelled", "Rejected"].includes(b.status) && <ActionButton label="Reject" tone="red" onClick={() => openReject(b.id)} icon={<XCircle />} />}</div></BookingCard>)}</div></section></div>; }

function AdminDashboard({ users, drivers, taxis, bookings, filteredBookings, payments, complaints, analytics, statusHistory, search, setSearch, statusFilter, setStatusFilter, toggleUserStatus, verifyDriver, assignDriver, deleteBooking, verifyPayment, resolveComplaint, openAdminReply, newTaxi, setNewTaxi, addTaxi }) { return <div className="space-y-6"><div className="grid gap-4 md:grid-cols-4"><StatCard title="Revenue" value={`$${analytics.revenue.toFixed(2)}`} icon={<Wallet />} /><StatCard title="Completed" value={analytics.completed} icon={<CheckCircle />} /><StatCard title="Cancelled" value={analytics.cancelled} icon={<XCircle />} /><StatCard title="Avg Rating" value={analytics.avgRating.toFixed(1)} icon={<Star />} /></div><div className="grid gap-6 lg:grid-cols-3"><ManageUsers users={users} toggleUserStatus={toggleUserStatus} /><ManageDrivers drivers={drivers} verifyDriver={verifyDriver} /><ManageTaxis taxis={taxis} drivers={drivers} newTaxi={newTaxi} setNewTaxi={setNewTaxi} addTaxi={addTaxi} /></div><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Payment Management" description="Track cash, QR wallet, card authorization, wallet balance, and invoice payments." /><div className="mt-4 grid gap-3 md:grid-cols-2">{payments.map((p) => <PaymentManagementCard key={p.id} payment={p} verifyPayment={verifyPayment} />)}</div></section><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Review & Complaint Management" description="Handle customer reviews and complaints." /><div className="mt-4 grid gap-3 md:grid-cols-2">{complaints.map((c) => <div key={c.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"><p className="font-semibold">{c.type} • Booking #{c.bookingId}</p><p className="text-sm text-slate-500 dark:text-slate-400">{c.message}</p><StatusBadge status={c.status} />{c.adminReply && <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-900"><p className="font-semibold">Admin reply</p><p className="text-slate-600 dark:text-slate-300">{c.adminReply}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.repliedAt}</p></div>}<div className="mt-3 flex flex-wrap gap-2"><button onClick={() => openAdminReply(c.id)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white">Reply</button><button onClick={() => resolveComplaint(c.id)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">Resolve</button></div></div>)}</div></section><section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Booking Monitoring & Assignment" description="Assign drivers and monitor full status flow." /><SearchFilter search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} /><div className="mt-4 space-y-4">{filteredBookings.map((b) => <div key={b.id} className="rounded-3xl border border-slate-200 p-5 dark:border-slate-700 dark:bg-slate-800"><BookingCard booking={b} history={statusHistory.filter((h) => h.bookingId === b.id)} /><div className="mt-4 grid gap-3 md:grid-cols-3"><Select label="Assign driver" value={b.driverId || ""} onChange={(driverId) => assignDriver(b.id, driverId)} options={[{ label: "Choose driver", value: "" }, ...drivers.map((d) => ({ label: `${d.name} (${d.verificationStatus}, ${d.status})`, value: d.id }))]} /><button onClick={() => deleteBooking(b.id)} className="mt-6 rounded-2xl bg-red-600 p-3 text-sm font-medium text-white">Delete Booking</button></div></div>)}</div></section></div>; }

function ConfirmBookingModal({ bookingForm, taxis, drivers, onClose, onConfirm }) { const taxi = taxis.find((t) => t.id === Number(bookingForm.taxiId)); const driver = taxi?.driverId ? drivers.find((d) => d.id === taxi.driverId) : null; const price = calculatePrice(bookingForm.carType, Number(bookingForm.passengers || 1)); const fee = paymentFee(bookingForm.paymentMethod, price); return <Modal title="Confirm Booking" onClose={onClose}><div className="space-y-3 text-sm"><p><b>Pickup:</b> {bookingForm.pickup}</p><p><b>Destination:</b> {bookingForm.destination}</p><p><b>Taxi:</b> {taxi ? `${taxi.carModel} • ${taxi.plate}` : bookingForm.carType}</p><p><b>Driver:</b> {driver?.name || "Not assigned yet"}</p><PaymentPreview bookingForm={bookingForm} amount={price} /><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><p>Base fare: ${baseFare(bookingForm.carType).toFixed(2)}</p><p>Passenger fee: ${Math.max(0, Number(bookingForm.passengers || 1) - 1).toFixed(2)}</p><p>Payment fee: ${fee.toFixed(2)}</p><p className="font-bold">Total: ${(price + fee).toFixed(2)}</p></div><button onClick={onConfirm} className="w-full rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900">Confirm Booking</button></div></Modal>; }
function PaymentMethodFields({ bookingForm, setBookingForm }) { const method = bookingForm.paymentMethod; if (method === "Cash") return <PaymentHint title="Cash payment" text="Pay directly to the driver when the trip is completed. The driver confirms cash received." />; if (["ABA Pay", "Wing Pay", "KHQR"].includes(method)) return <div className="space-y-3"><PaymentHint title={`${method} transfer`} text="Enter the transaction ID after sending payment. Admin can verify or reject it." /><Input label="Transaction ID" value={bookingForm.transactionId} onChange={(v) => setBookingForm({ ...bookingForm, transactionId: v, paymentProof: v })} placeholder="Example: TXN-ABA-2026-001" /></div>; if (method === "Credit/Debit Card") return <div className="space-y-3"><PaymentHint title="Card authorization" text="In a real system, the card is authorized first and captured after the trip is completed." /><Input label="Card holder name" value={bookingForm.cardHolder} onChange={(v) => setBookingForm({ ...bookingForm, cardHolder: v })} placeholder="Name on card" /><Input label="Last 4 digits" value={bookingForm.cardLast4} onChange={(v) => setBookingForm({ ...bookingForm, cardLast4: v, paymentProof: `Card ending ${v}` })} placeholder="1234" /></div>; if (method === "In-App Wallet") return <PaymentHint title="Wallet balance" text="This simulates paying from saved balance inside the app. Payment is verified immediately." />; if (method === "Corporate Account") return <PaymentHint title="Corporate invoice" text="The ride is billed to a company account. Admin can reconcile the invoice later." />; return null; }
function PaymentHint({ title, text }) { return <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800"><p className="font-semibold">{title}</p><p className="mt-1 text-slate-500 dark:text-slate-400">{text}</p></div>; }
function PaymentPreview({ bookingForm, amount }) { const fee = paymentFee(bookingForm.paymentMethod, amount); return <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"><p className="font-semibold"><CreditCard className="mr-2 inline h-4 w-4" />{bookingForm.paymentMethod}</p><p className="mt-1 text-slate-500 dark:text-slate-400">Initial status: {initialPaymentStatus(bookingForm.paymentMethod)}</p>{bookingForm.transactionId && <p className="mt-1 text-slate-500 dark:text-slate-400">Transaction ID: {bookingForm.transactionId}</p>}{bookingForm.cardLast4 && <p className="mt-1 text-slate-500 dark:text-slate-400">Card ending: {bookingForm.cardLast4}</p>}<p className="mt-1 text-slate-500 dark:text-slate-400">Payment fee: ${fee.toFixed(2)}</p></div>; }
function PaymentManagementCard({ payment, verifyPayment }) { return <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">Booking #{payment.bookingId} • ${payment.amount.toFixed(2)} {payment.currency}</p><p className="text-sm text-slate-500 dark:text-slate-400">{payment.method} • {payment.verificationType}</p></div><StatusBadge status={payment.status} /></div><div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300"><p>Transaction: {payment.transactionId || "Not required"}</p><p>Proof: {payment.proof || "No proof"}</p><p>Fee: ${payment.customerFee.toFixed(2)} • Net: ${payment.netAmount.toFixed(2)}</p><p>Paid at: {payment.paidAt || "Waiting"}</p>{payment.verifiedAt && <p>Verified at: {payment.verifiedAt}</p>}{payment.rejectedAt && <p>Rejected at: {payment.rejectedAt}</p>}</div><div className="mt-3 flex flex-wrap gap-2"><ActionButton label="Verify" tone="green" onClick={() => verifyPayment(payment.id, "Verified")} icon={<FileCheck />} /><ActionButton label="Reject" tone="red" onClick={() => verifyPayment(payment.id, "Rejected")} icon={<XCircle />} /></div></div>; }
function ReasonModal({ reasonForm, setReasonForm, onClose, onSubmit }) { const reasons = reasonForm.type === "cancel" ? ["Wrong location", "Too expensive", "Driver taking too long", "Other"] : ["Too far", "Busy", "Car issue", "Other"]; return <Modal title={reasonForm.type === "cancel" ? "Cancel Reason" : "Reject Reason"} onClose={onClose}><div className="space-y-3"><Select label="Reason" value={reasonForm.reason} onChange={(v) => setReasonForm({ ...reasonForm, reason: v })} options={[{ label: "Choose reason", value: "" }, ...reasons.map((r) => ({ label: r, value: r }))]} /><button onClick={onSubmit} className="w-full rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900">Submit</button></div></Modal>; }
function FeedbackModal({ feedbackForm, setFeedbackForm, onClose, onSubmit }) { return <Modal title={feedbackForm.type === "review" ? "Write Driver Feedback" : "Write Complaint Message"} onClose={onClose}><div className="space-y-3">{feedbackForm.type === "review" && <Select label="Rating" value={feedbackForm.rating} onChange={(v) => setFeedbackForm({ ...feedbackForm, rating: v })} options={[5, 4, 3, 2, 1].map((rating) => ({ label: `${rating} star${rating > 1 ? "s" : ""}`, value: rating }))} />}<label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Message<textarea className="mt-1 min-h-32 w-full rounded-2xl border border-slate-200 bg-white p-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder={feedbackForm.type === "review" ? "Write your feedback about the driver..." : "Write your complaint message..."} value={feedbackForm.message} onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })} /></label><button onClick={onSubmit} className="w-full rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900">Submit Message</button></div></Modal>; }
function AdminReplyModal({ adminReplyForm, setAdminReplyForm, onClose, onSubmit }) { return <Modal title="Reply to Customer" onClose={onClose}><div className="space-y-3"><label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Reply message<textarea className="mt-1 min-h-32 w-full rounded-2xl border border-slate-200 bg-white p-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="Write your reply to the customer..." value={adminReplyForm.message} onChange={(e) => setAdminReplyForm({ ...adminReplyForm, message: e.target.value })} /></label><button onClick={onSubmit} className="w-full rounded-2xl bg-slate-900 p-3 font-medium text-white dark:bg-white dark:text-slate-900">Send Reply</button></div></Modal>; }
function Modal({ title, children, onClose }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:text-slate-100"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">{title}</h2><button onClick={onClose} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800"><XCircle className="h-5 w-5" /></button></div>{children}</div></div>; }
function ProfileCard({ person, updateProfile }) { const [edit, setEdit] = useState(false); const [form, setForm] = useState({ name: person?.name || "", phone: person?.phone || "", email: person?.email || "", profileImage: person?.profileImage || "" }); const avatar = form.profileImage || person?.profileImage; return <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><div className="flex items-center justify-between"><PanelHeader title="Profile Management" description="Update account information and picture." /><button onClick={() => setEdit(!edit)} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800"><Edit3 className="h-4 w-4" /></button></div><div className="mt-4 flex items-center gap-4"><div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">{avatar ? <img src={avatar} alt={person?.name} className="h-full w-full object-cover" /> : <Camera className="h-8 w-8" />}</div><div><p className="font-semibold">{person?.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{person?.email}</p></div></div>{edit ? <div className="mt-4 space-y-3"><Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} /><Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} /><Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} /><Input label="Profile picture URL" value={form.profileImage} onChange={(v) => setForm({ ...form, profileImage: v })} placeholder="Paste image URL" /><button onClick={() => { updateProfile(form); setEdit(false); }} className="w-full rounded-2xl bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900">Save Profile</button></div> : <div className="mt-4 text-sm text-slate-600 dark:text-slate-300"><p><Phone className="mr-2 inline h-4 w-4" />{person?.phone}</p><StatusBadge status={person?.status || person?.verificationStatus} /></div>}</section>; }
function ManageUsers({ users, toggleUserStatus }) { return <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Manage Users" description="Block or activate users." /><div className="mt-4 space-y-3">{users.map((u) => <Row key={u.id} title={u.name} subtitle={`${u.phone} • ${u.email}`} action={u.status} onClick={() => toggleUserStatus(u.id)} />)}</div></section>; }
function ManageDrivers({ drivers, verifyDriver }) { return <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Driver Verification" description="Approve or reject driver accounts." /><div className="mt-4 space-y-3">{drivers.map((d) => <div key={d.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"><p className="font-semibold">{d.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{d.phone} • ⭐ {d.rating}</p><div className="mt-2 flex flex-wrap gap-2"><StatusBadge status={d.verificationStatus} /><button onClick={() => verifyDriver(d.id, "Verified")} className="rounded-xl bg-green-100 px-3 py-2 text-sm text-green-700">Approve</button><button onClick={() => verifyDriver(d.id, "Rejected") } className="rounded-xl bg-red-100 px-3 py-2 text-sm text-red-700">Reject</button></div></div>)}</div></section>; }
function ManageTaxis({ taxis, drivers, newTaxi, setNewTaxi, addTaxi }) { return <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><PanelHeader title="Manage Taxis" description="Add and assign taxis." /><div className="mt-4 space-y-3"><Input label="Car model" value={newTaxi.carModel} onChange={(v) => setNewTaxi({ ...newTaxi, carModel: v })} /><Input label="Plate" value={newTaxi.plate} onChange={(v) => setNewTaxi({ ...newTaxi, plate: v })} /><Input label="Car picture URL" value={newTaxi.imageUrl} onChange={(v) => setNewTaxi({ ...newTaxi, imageUrl: v })} /><Select label="Type" value={newTaxi.carType} onChange={(v) => setNewTaxi({ ...newTaxi, carType: v })} options={carTypes()} /><Select label="Driver" value={newTaxi.driverId} onChange={(v) => setNewTaxi({ ...newTaxi, driverId: v })} options={[{ label: "Unassigned", value: "" }, ...drivers.map((d) => ({ label: d.name, value: d.id }))]} /><button onClick={addTaxi} className="w-full rounded-2xl bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900">Add Taxi</button></div><div className="mt-4 space-y-2">{taxis.map((t) => <div key={t.id} className="overflow-hidden rounded-2xl border border-slate-200 text-sm dark:border-slate-700 dark:bg-slate-800"><CarImagePlaceholder taxi={t} small /><div className="p-3"><p className="font-semibold">{t.carModel} • {t.plate}</p><p className="text-slate-500 dark:text-slate-400">{t.carType} • Driver ID: {t.driverId || "None"}</p></div></div>)}</div></section>; }
function CarImagePlaceholder({ taxi, small = false }) { return <div className={`${small ? "h-24" : "h-36"} flex items-center justify-center bg-slate-100`}>{taxi.imageUrl ? <img src={taxi.imageUrl} alt={taxi.carModel} className="h-full w-full object-cover" /> : <div className="flex flex-col items-center text-slate-400"><Car className={`${small ? "h-8 w-8" : "h-12 w-12"}`} /><span className="mt-2 text-xs font-medium">Car picture placeholder</span></div>}</div>; }
function BookingCard({ booking, history = [], children }) { return <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="font-semibold">Booking #{booking.id} • {booking.carType}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{booking.passengers} passenger(s) • ${booking.price.toFixed(2)}</p></div><StatusBadge status={booking.status} /></div><div className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-300 md:grid-cols-2"><p><User className="mr-2 inline h-4 w-4" />{booking.customer}</p><p><Car className="mr-2 inline h-4 w-4" />{booking.driver}</p><p><MapPin className="mr-2 inline h-4 w-4" />{booking.pickup} → {booking.destination}</p><p><Clock className="mr-2 inline h-4 w-4" />{booking.date} at {booking.time}</p><p><CreditCard className="mr-2 inline h-4 w-4" />{booking.paymentMethod} • {booking.paymentStatus}</p>{booking.rating && <p><Star className="mr-2 inline h-4 w-4" />{booking.rating}/5 • {booking.review}</p>}{booking.cancelReason && <p><AlertTriangle className="mr-2 inline h-4 w-4" />Cancel: {booking.cancelReason}</p>}{booking.rejectReason && <p><AlertTriangle className="mr-2 inline h-4 w-4" />Reject: {booking.rejectReason}</p>}</div>{history.length > 0 && <details className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-900"><summary className="cursor-pointer font-medium"><History className="mr-2 inline h-4 w-4" />Status history</summary><div className="mt-3 space-y-2">{history.map((h) => <p key={h.id} className="text-slate-600 dark:text-slate-300">{h.createdAt} • {h.status} • {h.actor} • {h.note}</p>)}</div></details>}{children}</div>; }
function CustomerRepliesPanel({ complaints }) { return <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><p className="font-semibold"><MessageSquare className="mr-2 inline h-4 w-4" />Your feedback and admin replies</p><div className="mt-3 space-y-3">{complaints.map((c) => <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900"><p className="font-semibold">{c.type} • Booking #{c.bookingId}</p><p className="mt-1 text-slate-600 dark:text-slate-300">You: {c.message}</p>{c.adminReply ? <p className="mt-2 rounded-xl bg-blue-50 p-3 text-blue-800 dark:bg-blue-950/50 dark:text-blue-200">Admin: {c.adminReply}</p> : <p className="mt-2 text-slate-500 dark:text-slate-400">Waiting for admin reply.</p>}</div>)}</div></div>; }
function NotificationPanel({ notifications }) { return <section className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900 dark:shadow-none"><p className="font-semibold"><Bell className="mr-2 inline h-4 w-4" />Notifications</p><div className="mt-3 grid gap-2 md:grid-cols-2">{notifications.slice(0, 4).map((n) => <div key={n.id} className="rounded-2xl bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-950/50 dark:text-blue-200">{n.message}</div>)}</div></section>; }
function SearchFilter({ search, setSearch, statusFilter, setStatusFilter }) { const statuses = ["All", "Pending", "Assigned", "Accepted", "Driver Arrived", "In Progress", "Completed", "Cancelled", "Rejected"]; return <div className="mt-4 grid gap-3 md:grid-cols-3"><div className="relative md:col-span-2"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" /><input className="w-full rounded-2xl border border-slate-200 bg-white p-3 pl-10 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="Search booking, customer, location..." value={search} onChange={(e) => setSearch(e.target.value)} /></div><select className="rounded-2xl border border-slate-200 bg-white p-3 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></div>; }
function Row({ title, subtitle, action, onClick }) { return <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800"><div><p className="font-semibold">{title}</p><p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p></div><button onClick={onClick} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium dark:bg-slate-700 dark:text-slate-100">{action}</button></div>; }
function Notice({ notice }) { return <div className="mt-5 flex items-center gap-2 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/50 dark:text-blue-200"><Bell className="h-4 w-4" />{notice}</div>; }
function StatCard({ title, value, icon }) { return <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-none"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500 dark:text-slate-400">{title}</p><p className="mt-1 text-3xl font-bold">{value}</p></div><div className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{React.cloneElement(icon, { className: "h-6 w-6" })}</div></div></div>; }
function RoleButton({ active, onClick, icon, label }) { return <button onClick={onClick} className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${active ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"}`}>{React.cloneElement(icon, { className: "h-4 w-4" })}{label}</button>; }
function PanelHeader({ title, description }) { return <div><h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p></div>; }
function Input({ label, value, onChange, placeholder = "", type = "text" }) { return <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label}<input type={type} min="1" className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} /></label>; }
function Select({ label, value, onChange, options }) { return <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label}<select className="mt-1 w-full rounded-2xl border border-slate-200 bg-white p-3 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>; }
function StatusBadge({ status }) { const style = { Pending: "bg-yellow-100 text-yellow-700", Assigned: "bg-cyan-100 text-cyan-700", Accepted: "bg-blue-100 text-blue-700", "Driver Arrived": "bg-indigo-100 text-indigo-700", "In Progress": "bg-purple-100 text-purple-700", Completed: "bg-green-100 text-green-700", Cancelled: "bg-red-100 text-red-700", Rejected: "bg-red-100 text-red-700", Available: "bg-green-100 text-green-700", Busy: "bg-orange-100 text-orange-700", Offline: "bg-slate-100 text-slate-700", Active: "bg-green-100 text-green-700", Blocked: "bg-red-100 text-red-700", Verified: "bg-green-100 text-green-700", Authorized: "bg-blue-100 text-blue-700", Captured: "bg-green-100 text-green-700", "Pending Verification": "bg-yellow-100 text-yellow-700", "Invoice Pending": "bg-orange-100 text-orange-700", Resolved: "bg-green-100 text-green-700", Open: "bg-red-100 text-red-700", Reviewed: "bg-blue-100 text-blue-700", Replied: "bg-blue-100 text-blue-700" }[status] || "bg-slate-100 text-slate-700"; return <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>{status}</span>; }
function ActionButton({ label, tone, onClick, icon }) { const style = { blue: "bg-blue-600 hover:bg-blue-700", green: "bg-green-600 hover:bg-green-700", red: "bg-red-600 hover:bg-red-700", yellow: "bg-yellow-500 hover:bg-yellow-600" }[tone]; return <button onClick={onClick} className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white ${style}`}>{React.cloneElement(icon, { className: "h-4 w-4" })}{label}</button>; }
function carTypes() { return ["Normal Car", "SUV", "Tuk Tuk", "Van"].map((x) => ({ label: x, value: x })); }
function paymentMethods() { return ["Cash", "ABA Pay", "KHQR", "Wing Pay", "Credit/Debit Card", "In-App Wallet", "Corporate Account"].map((x) => ({ label: x, value: x })); }
function initialPaymentStatus(method) { if (method === "Cash") return "Unpaid"; if (["ABA Pay", "KHQR", "Wing Pay"].includes(method)) return "Pending Verification"; if (method === "Credit/Debit Card") return "Authorized"; if (method === "In-App Wallet") return "Verified"; if (method === "Corporate Account") return "Invoice Pending"; return "Pending"; }
function completedPaymentStatus(method) { if (method === "Credit/Debit Card") return "Captured"; if (method === "Corporate Account") return "Invoice Pending"; return "Verified"; }
function paymentFee(method, amount) { if (method === "Credit/Debit Card") return Math.round(amount * 0.03 * 100) / 100; if (method === "Corporate Account") return 0; return 0; }
function buildPaymentRecord(id, booking, amount) { const fee = paymentFee(booking.paymentMethod, amount); const status = initialPaymentStatus(booking.paymentMethod); const paidAt = ["Verified", "Authorized", "Pending Verification"].includes(status) ? now() : ""; return { id, bookingId: booking.id, amount: amount + fee, currency: "USD", method: booking.paymentMethod, status, transactionId: booking.transactionId || booking.paymentProof || "", proof: booking.paymentProof || (booking.paymentMethod === "Cash" ? "Cash to be collected by driver" : booking.paymentMethod === "In-App Wallet" ? "Wallet balance deducted" : booking.paymentMethod === "Credit/Debit Card" ? `Card ${booking.cardLast4 ? `ending ${booking.cardLast4}` : "authorized"}` : "Waiting for proof"), providerRef: booking.transactionId || "", verificationType: ["ABA Pay", "KHQR", "Wing Pay"].includes(booking.paymentMethod) ? "Manual Admin Review" : booking.paymentMethod === "Credit/Debit Card" ? "Gateway Authorization" : booking.paymentMethod === "In-App Wallet" ? "Wallet Ledger" : booking.paymentMethod === "Corporate Account" ? "Invoice Reconciliation" : "Driver Cash Confirmation", paidAt, verifiedAt: status === "Verified" ? now() : "", customerFee: fee, netAmount: amount }; }
function nextId(list, start = 1) { return list.length ? Math.max(...list.map((item) => item.id)) + 1 : start; }
function now() { return new Date().toISOString().slice(0, 16).replace("T", " "); }
function baseFare(carType) { return { "Normal Car": 5, SUV: 8, "Tuk Tuk": 3, Van: 10 }[carType] || 5; }
function calculatePrice(carType, passengers) { return baseFare(carType) + Math.max(0, passengers - 1) * 1; }
