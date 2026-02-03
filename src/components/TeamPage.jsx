// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const TeamPage = ({ t, teamMembers = [] }) => {
//   return (
//     <div className="teamsPage">
//       <div className="container">
//         <div className="teamsTop">
//           <Link href="/">
//             <strong className="topper">Adentta</strong>
//           </Link>
//           <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//           <span className="topper">{t?.teamTitle || "Team"}</span>
//         </div>

//         <div className="teamsPageHeaderText">
//           <span>{t?.teamTitle || "Team"}</span>
//           <h1> {t?.teamMeet || "Meet our team"}</h1>
//           <p>
//             {t?.teamContent || "Adentta Professional Team"}
//           </p>
//         </div>

//         <div className="teamsPageCards">
//           <div className="row-gap">
//             {teamMembers.map((member) => (
//               <div key={member.id} className="xl-3 lg-3 md-6 sm-12">
//                 <div className="teamsCards">
//                   <div className="teamsPageCard">
//                     <div className="teamsPageCardImg">
//                       {member.image && (
//                         <Image
//                           src={`https://admin.adentta.az/storage${member.image}`}
//                           alt={member.title}
//                           width={400}
//                           height={400}
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <div className="teamsPageCardContent">
//                     <h3>{member.title}</h3>
//                     <div
//                       dangerouslySetInnerHTML={{ __html: member.content }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamPage;




"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

const TeamPage = ({ t, teamMembers = [] }) => {
  const [list, setList] = useState(teamMembers || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || fetchingRef.current) return;
    setLoading(true);
    fetchingRef.current = true;
    
    try {
      // 1 saniyə delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nextPage = page + 1;
      const res = await axiosInstance.get(`/page-data/team?page=${nextPage}`);
      const newData = res?.data?.data?.data || res?.data?.data || [];

      if (!newData || newData.length === 0) {
        setHasMore(false);
      } else {
        setList((prev) => [...prev, ...newData]);
        setPage(nextPage);

        const meta = res?.data?.data?.meta || res?.data?.meta || null;
        if (meta) {
          const current = meta.current_page ?? nextPage;
          const last = meta.last_page ?? (meta.total && meta.per_page ? Math.ceil(meta.total / meta.per_page) : null);
          if (last !== null) setHasMore(current < last);
        } else {
          const perPage = res?.data?.data?.meta?.per_page ?? 12;
          if (newData.length < perPage) setHasMore(false);
        }
      }
    } catch (err) {
      console.error("loadMore error:", err);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  return (
    <div className="teamsPage">
      <div className="container">
        <div className="teamsTop">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.teamTitle || "Team"}</span>
        </div>

        <div className="teamsPageHeaderText">
          <span>{t?.teamTitle || "Team"}</span>
          <h1>{t?.teamMeet || "Meet our team"}</h1>
          <p>{t?.teamContent || "Adentta Professional Team"}</p>
        </div>

        <div className="teamsPageCards">
          <div className="row-gap">
            {list.map((member) => (
              <div key={member.id} className="xl-3 lg-3 md-6 sm-12">
                <div className="teamsCards">
                  <div className="teamsPageCard">
                    <div className="teamsPageCardImg">
                      {member.image && (
                        <Image
                          src={`https://admin.adentta.az/storage${member.image}`}
                          alt={member.title}
                          width={400}
                          height={400}
                        />
                      )}
                    </div>
                  </div>
                  <div className="teamsPageCardContent">
                    <h3>{member.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: member.content }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading spinner - kartların altında, tam ortada */}
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  border: "6px solid #f3f3f3",
                  borderTop: "6px solid #293881",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          )}

          {/* sentinel — observer üçün */}
          <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;