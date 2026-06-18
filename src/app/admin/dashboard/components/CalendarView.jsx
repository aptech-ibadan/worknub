"use client";
import { useState, useMemo } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";

const statusConfig = {
  "Checked in":  { badge: "bg-green-50 text-green-800 border-green-200",  dot: "bg-green-600"  },
  "Checked out": { badge: "bg-red-50 text-red-800 border-red-200",        dot: "bg-red-600"    },
  "Due in":      { badge: "bg-amber-50 text-amber-800 border-amber-200",  dot: "bg-amber-600"  },
  "Due out":     { badge: "bg-blue-50 text-blue-800 border-blue-200",     dot: "bg-blue-600"   },
};

const bookings = [
  { id:1,  name:"Sandra",   status:"Due in",      start:2,  end:5,  room:"Hot desk"     },
  { id:2,  name:"Bayo",     status:"Checked out", start:3,  end:6,  room:"Private desk" },
  { id:3,  name:"Adeola",   status:"Checked out", start:1,  end:4,  room:"Meeting room" },
  { id:4,  name:"Dele",     status:"Due out",     start:8,  end:11, room:"Event space"  },
  { id:5,  name:"Dayo",     status:"Checked out", start:9,  end:12, room:"Hot desk"     },
  { id:6,  name:"Sampson",  status:"Due in",      start:4,  end:7,  room:"Private desk" },
  { id:7,  name:"Chinedu",  status:"Checked out", start:6,  end:9,  room:"Meeting room" },
  { id:8,  name:"Gbenga",   status:"Due out",     start:2,  end:5,  room:"Event space"  },
  { id:9,  name:"John",     status:"Checked in",  start:9,  end:12, room:"Hot desk"     },
  { id:10, name:"Muhammad", status:"Due in",      start:5,  end:8,  room:"Private desk" },
  { id:11, name:"Mustapha", status:"Due out",     start:1,  end:3,  room:"Meeting room" },
  { id:12, name:"Yahaya",   status:"Checked in",  start:10, end:12, room:"Event space"  },
];

const filters = ["All", "Checked in", "Due in", "Due out", "Checked out"];

function fmtDate(d) { return `Feb ${d}, 2025`; }
function initials(name) { return name.slice(0, 2).toUpperCase(); }

export default function UsersView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => bookings.filter(r => {
    const matchF = activeFilter === "All" || r.status === activeFilter;
    const matchQ = !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.room.toLowerCase().includes(query.toLowerCase());
    return matchF && matchQ;
  }), [activeFilter, query]);

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Admin</p>
//           <h1 className="text-2xl font-bold text-worknub-dark">Users</h1>
//         </div>
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
//           <input
//             type="text"
//             placeholder="Search name or space…"
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//             className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-worknub-green w-52 transition-colors"
//           />
//         </div>
//       </div>

//       {/* Filter pills */}
//       <div className="flex gap-2 flex-wrap mb-5">
//         {filters.map(f => {
//           const isActive = activeFilter === f;
//           const cfg = f !== "All" ? statusConfig[f] : null;
//           return (
//             <button
//               key={f}
//               onClick={() => setActiveFilter(f)}
//               className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full border transition-all ${
//                 isActive
//                   ? f === "All"
//                     ? "bg-worknub-dark text-white border-worknub-dark"
//                     : cfg.badge + " border"
//                   : "bg-white text-gray-400 border-gray-200 opacity-50 hover:opacity-80"
//               }`}
//             >
//               {cfg && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
//               {f}
//               {f === "All" && <span className="text-[11px] opacity-60 ml-0.5">{bookings.length}</span>}
//             </button>
//           );
//         })}
//       </div>

//       {/* Table */}
//       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-gray-100">
//               <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-[28%]">Guest</th>
//               <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-[20%]">Room</th>
//               <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-[18%]">Check-in</th>
//               <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-[18%]">Check-out</th>
//               <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-[16%]">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm">No guests match your filter.</td></tr>
//             ) : filtered.map(r => (
//               <tr key={r.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-2.5">
//                     <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-500 shrink-0">
//                       {initials(r.name)}
//                     </div>
//                     <span className="font-medium text-worknub-dark">{r.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3">
//                   <span className="text-[11px] bg-gray-50 border border-gray-100 rounded px-2 py-1 text-gray-500">{r.room}</span>
//                 </td>
//                 <td className="px-4 py-3 text-gray-500">{fmtDate(r.start)}</td>
//                 <td className="px-4 py-3 text-gray-500">{fmtDate(r.end)}</td>
//                 <td className="px-4 py-3">
//                   <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full border ${statusConfig[r.status].badge}`}>
//                     <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[r.status].dot}`} />
//                     {r.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <p className="text-[12px] text-gray-400 mt-3">
//         Showing {filtered.length} guest{filtered.length !== 1 ? "s" : ""}
//       </p>
//     </div>
//   );

const skeletonRows = [1, 2, 3, 4, 5]
return(
     <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Admin</p>
          <h1 className="text-2xl font-bold text-worknub-dark">Users</h1>
        </div>
        <div className="w-52 h-9 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Skeleton filter pills */}
      <div className="flex gap-2 mb-5">
        {[52, 90, 72, 80, 100].map((w, i) => (
          <div key={i} className="h-7 bg-gray-100 rounded-full animate-pulse" style={{ width: w }} />
        ))}
      </div>

      {/* Table with overlay */}
      <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Guest", "Room", "Check-in", "Check-out", "Status"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse shrink-0" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: 70 + i * 12 }} />
                  </div>
                </td>
                <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-100 rounded animate-pulse" /></td>
                <td className="px-4 py-3"><div className="h-3 w-24 bg-gray-100 rounded animate-pulse" /></td>
                <td className="px-4 py-3"><div className="h-3 w-24 bg-gray-100 rounded animate-pulse" /></td>
                <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Coming soon overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-2xl">
          <div className="w-16 h-16 bg-worknub-mint rounded-2xl flex items-center justify-center mb-4 border border-worknub-green/20">
            <FiUsers size={28} className="text-worknub-green" />
          </div>
          <p className="text-base font-semibold text-worknub-dark mb-1">Users coming soon</p>
          <p className="text-sm text-gray-400 text-center max-w-[220px] leading-relaxed">
            Guest management, check-ins, and booking history will appear here.
          </p>
        </div>
      </div>

      <p className="text-[12px] text-gray-400 mt-3">Showing 0 guests</p>
    </div>
)
}