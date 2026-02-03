// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import NewProductPage from "@/components/Footer/NewProductPage";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// function buildRawQuery(searchParams = {}) {
//   const parts = [];
//   for (const [key, value] of Object.entries(searchParams || {})) {
//     if (Array.isArray(value)) {
//       for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//     } else if (value !== undefined && value !== null && value !== "") {
//       parts.push(`${key}=${encodeURIComponent(String(value))}`);
//     }
//   }
//   return parts.join("&");
// }

// // ------- SLUG HELPERS -------
// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

// // URL-dən gələn slug-ı OLDUĞU KİMİ götür (sementler-4 daxil)
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // URL-dən GƏLƏN BÜTÜN category slugs (category=... təkrarlı)
// function readAllCategorySlugs(rawCategoryParam) {
//   if (!rawCategoryParam) return [];
//   if (Array.isArray(rawCategoryParam)) {
//     return rawCategoryParam
//       .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//       .filter(Boolean);
//   }
//   return [String(rawCategoryParam).split("?")[0].replace(/\/+$/, "")]
//     .filter(Boolean);
// }

// // ---- HELPERS: parent/child əlaqəsi (server) ----
// function normalizeParentIdsServer(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// function collectDescendantCategoryIdsServer(parentId, categoryData = []) {
//   const pid = Number(parentId);
//   if (!Number.isFinite(pid)) return [];
//   const result = new Set();
//   const stack = [pid];
//   const seen = new Set();

//   while (stack.length) {
//     const current = stack.pop();
//     if (seen.has(current)) continue;
//     seen.add(current);

//     for (const c of categoryData || []) {
//       const parents = normalizeParentIdsServer(c.parent_id);
//       if (parents.includes(current)) {
//         const cid = parseInt(c.id, 10);
//         if (Number.isFinite(cid) && !result.has(cid)) {
//           result.add(cid);
//           stack.push(cid);
//         }
//       }
//     }
//   }

//   // yalnız ALT-lar; baza parent ayrıca əlavə olunacaq
//   return Array.from(result);
// }

// async function fetchProductsPageData(searchParams = {}) {
//   const cookieStore = await cookies();
//   const langCookie = cookieStore.get("NEXT_LOCALE");
//   const locale = langCookie?.value ?? undefined;

//   try {
//     const perPage = searchParams?.per_page ? String(searchParams.per_page) : "12";

//     // 1) URL-dən BÜTÜN category slugs oxu
//     const categorySlugs = readAllCategorySlugs(searchParams?.category ?? searchParams?.["category"]);

//     // 2) URL-dən BÜTÜN brand id-lərini oxu
//     const brandParams = searchParams?.brand ?? searchParams?.["brand"];
//     const brandIds = Array.isArray(brandParams)
//       ? brandParams.map((b) => parseInt(b, 10)).filter(Number.isFinite)
//       : brandParams != null
//       ? [parseInt(brandParams, 10)].filter(Number.isFinite)
//       : [];

//     // Digər parametrlər
//     const otherParams = {};
//     for (const [k, v] of Object.entries(searchParams || {})) {
//       if (k === "per_page" || k === "category" || k === "brand") continue;
//       if (/^filters?\[.*\]/.test(k)) continue;
//       otherParams[k] = v;
//     }
//     const otherQuery = buildRawQuery(otherParams);

//     let queryString = `per_page=${encodeURIComponent(perPage)}`;

//     if (categorySlugs.length > 0) {
//       const { data: catResp } = await axiosInstance.get(`/page-data/categories?per_page=999`, {
//         cache: "no-store",
//       });
//       const allCats =
//         Array.isArray(catResp?.data?.data) ? catResp.data.data :
//         Array.isArray(catResp?.data) ? catResp.data :
//         Array.isArray(catResp?.items) ? catResp.items : [];

//       const expandedCatIds = new Set();
//       for (const slug of categorySlugs) {
//         const match = allCats.find((c) => getCategorySlug(c) === slug);
//         if (match?.id != null) {
//           const baseId = Number(match.id);
//           if (Number.isFinite(baseId)) {
//             expandedCatIds.add(baseId);
//             collectDescendantCategoryIdsServer(baseId, allCats).forEach((d) =>
//               expandedCatIds.add(Number(d))
//             );
//           }
//         }
//       }

//       if (expandedCatIds.size > 0) {
//         queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedCatIds).forEach((id) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(id))}`;
//         });
//       }
//     }

//     if (brandIds.length > 0) {
//       const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//       queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//       brandIds.forEach((bid) => {
//         queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//       });
//     }

//     if (otherQuery) queryString += `&${otherQuery}`;

//     const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//       headers: locale ? { Lang: locale } : {},
//       cache: "no-store",
//     });

//     const items = Array.isArray(data)
//       ? data
//       : Array.isArray(data?.data)
//       ? data.data
//       : Array.isArray(data?.data?.data)
//       ? data.data.data
//       : Array.isArray(data?.items)
//       ? data.items
//       : [];

//     return items;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchSettingsPageData() {
//   try {
//     const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
//       cache: "no-store",
//     });
//     return setting;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchCategoryPageData() {
//   try {
//     const { data: category } = await axiosInstance.get(
//       `/page-data/categories?per_page=999`,
//       { cache: "no-store" }
//     );
//   return category;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchContactPageData() {
//   try {
//     const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
//       cache: "no-store",
//     });
//     return contact;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchEventsPageData() {
//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event`, {
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     throw error;
//   }
// }

// async function fetchBrandsPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       cache: "no-store",
//     });
//     return brands;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getTranslations() {
//   try {
//     const data = axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function generateMetadata({ searchParams }) {
//   const catSlug = readCategorySlug(searchParams?.category);
//   let metaSourceCategory = null;

//   if (catSlug) {
//     const categoryResp = await fetchCategoryPageData();
//     const allCats = categoryResp?.data?.data || [];
//     metaSourceCategory = allCats.find((c) => getCategorySlug(c) === catSlug) || null;
//   }

//   if (!metaSourceCategory) {
//     const products = await fetchProductsPageData(searchParams ?? {});
//     const firstProduct = products?.[0];
//     metaSourceCategory = firstProduct?.categories?.[0] || null;
//   }

//   const title = metaSourceCategory?.meta_title || "Adentta";
//   const description = metaSourceCategory?.meta_description || "Adentta";
//   const canonicalUrl = "https://adentta.az";

//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: metaSourceCategory?.icon
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${metaSourceCategory.icon}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: metaSourceCategory?.icon
//         ? [`https://admin.adentta.az/storage${metaSourceCategory.icon}`]
//         : [],
//     },
//     alternates: { canonical: canonicalUrl },
//   };
// }

// const Page = async ({ searchParams }) => {
//   const productData = await fetchProductsPageData(searchParams ?? {});
//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];
//   const categoryResponse = await fetchCategoryPageData();
//   const categoryData = categoryResponse?.data?.data || [];
//   const contact = await fetchContactPageData();
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];
//   const translations = await getTranslations();
//   const t = translations?.data;

//   // Seçilmiş kateqoriya — SLUG ilə (EXACT match)
//   const categorySlug = readCategorySlug(searchParams?.category);
//   let selectedCategoryObj = null;
//   if (categorySlug) {
//     selectedCategoryObj =
//       categoryData.find((c) => getCategorySlug(c) === categorySlug) || null;
//   }

//   // Alt kateqoriyalar UI üçündür
//   let subcategoriesForSelected = [];
//   if (selectedCategoryObj) {
//     const selId = parseInt(selectedCategoryObj.id, 10);

//     subcategoriesForSelected = categoryData.filter((c) => {
//       if (!c.parent_id) return false;

//       if (Array.isArray(c.parent_id)) {
//         return c.parent_id.some((p) => {
//           const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//           return pid === selId;
//         });
//       }

//       if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//         const pid =
//           typeof c.parent_id.id === "number" ? c.parent_id.id : parseInt(c.parent_id.id, 10);
//         return pid === selId;
//       }

//       return c.parent_id === selId;
//     });
//   }

//   return (
//     <div>
//       <Header settingData={settingData} categoryData={categoryData} />
//       <ProductsPageHero
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//         subcategories={subcategoriesForSelected}
//         categoryData={categoryData}
//       />
//       <NewProductPage
//         categoryData={categoryData}
//         brandsData={brandsData}
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//       />
//       <Footer
//         contact={contact}
//         categoryData={categoryData}
//         eventsData={eventsData}
//         brandsData={brandsData}
//       />
//     </div>
//   );
// };

// export default Page;





























"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactSelect from "../ReactSelect";
import Manat from "../../../public/icons/manat.svg";
import axiosInstance from "@/lib/axios";

const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\/\\]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getCategorySlug = (cat) =>
  cat?.url_slug ??
  cat?.slug ??
  cat?.url ??
  cat?.urlSlug ??
  slugify(cat?.title ?? "");

function readAllCategorySlugsFromParams(params) {
  if (!params) return [];
  const list = params.getAll("category");
  return list
    .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
    .filter(Boolean);
}

const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        <img
          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
          alt="Toggle Icon"
          className="toggle-icon"
        />
      </button>

      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const normalizeIds = (arr = []) =>
  Array.from(
    new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
  );

function normalizeParentIds(parentRaw) {
  if (!parentRaw) return [];
  if (Array.isArray(parentRaw)) {
    return parentRaw
      .map((p) => (typeof p === "object" && p !== null ? p.id : p))
      .map((v) => parseInt(v, 10))
      .filter((v) => Number.isFinite(v));
  }
  if (
    typeof parentRaw === "object" &&
    parentRaw !== null &&
    parentRaw.id != null
  ) {
    const n = parseInt(parentRaw.id, 10);
    return Number.isFinite(n) ? [n] : [];
  }
  const n = parseInt(parentRaw, 10);
  return Number.isFinite(n) ? [n] : [];
}

const ProductsPageFilter = ({
  productData: initialProductData = [],
  initialTotalCount = 0,
  t,
  brandsData,
  categoryData,
  selectedCategory,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productData, setProductData] = useState(initialProductData);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = (searchParams.get("search_text") || "").trim();

  // SSR-dan gələn initial data-nı set et
  useEffect(() => {
    setProductData(initialProductData);
    setTotalCount(initialTotalCount);
  }, [initialProductData, initialTotalCount]);

  const collectDescendantCategoryIds = useCallback(
    (parentId) => {
      const pid = Number(parentId);
      if (!Number.isFinite(pid)) return [];
      const result = new Set();
      const stack = [pid];
      const seen = new Set();

      while (stack.length) {
        const current = stack.pop();
        if (seen.has(current)) continue;
        seen.add(current);

        for (const c of categoryData || []) {
          const parents = normalizeParentIds(c.parent_id);
          if (parents.includes(current)) {
            const cid = parseInt(c.id, 10);
            if (Number.isFinite(cid)) {
              result.add(cid);
              stack.push(cid);
            }
          }
        }
      }
      return Array.from(result);
    },
    [categoryData]
  );

  useEffect(() => {
    if (selectedCategory?.id) {
      setSelectedCategoryIds([Number(selectedCategory.id)]);
    } else {
      const urlSlugs = readAllCategorySlugsFromParams(searchParams);
      if (urlSlugs.length > 0) {
        const ids = urlSlugs
          .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
          .map(Number)
          .filter(Number.isFinite);
        setSelectedCategoryIds(ids.length > 0 ? ids : []);
      } else {
        setSelectedCategoryIds([]);
      }
    }
  }, [selectedCategory?.id, searchParams, categoryData]);

  useEffect(() => {
    const brands = searchParams
      .getAll("brand")
      .map((b) => parseInt(b, 10))
      .filter(Number.isFinite);
    setSelectedBrandIds(brands);
  }, [searchParams]);

  const perPage = useMemo(() => Number(searchParams.get("per_page") || 12), [searchParams]);

  const totalPages = useMemo(() => (totalCount ? Math.ceil(totalCount / perPage) : 1), [totalCount, perPage]);

  const currentPage = useMemo(() => Math.max(1, Number(searchParams.get("page") || 1)), [searchParams]);

  const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
    const urlSlugs = readAllCategorySlugsFromParams(searchParams);
    if (urlSlugs.length > 0) {
      const ids = urlSlugs
        .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
        .map(Number)
        .filter(Number.isFinite);
      if (ids.length > 0) return ids;
    }
    return selectedCategoryIds.length > 0 ? selectedCategoryIds.map(Number) : [];
  }, [searchParams, categoryData, selectedCategoryIds]);

  const extractTotal = (raw, items) => {
    if (!raw) return Array.isArray(items) ? items.length : 0;
    if (typeof raw?.data?.total === "number") return raw.data.total;
    if (typeof raw?.total === "number") return raw.total;
    if (typeof raw?.meta?.total === "number") return raw.meta.total;
    return Array.isArray(items) ? items.length : 0;
  };

  const loadProducts = async () => {
    try {
      setLoading(true);

      const page = currentPage;
      const baseIds = getBaseCategoryIdsFromUrlOrState();
      const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

      let queryString = `per_page=${encodeURIComponent(String(perPage))}&page=${encodeURIComponent(String(page))}`;

      if (baseIds.length > 0) {
        const expandedSet = new Set();
        baseIds.forEach((id) => {
          const nid = Number(id);
          if (Number.isFinite(nid)) {
            expandedSet.add(nid);
            collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
          }
        });
        queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
        Array.from(expandedSet).forEach((val) => {
          queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
        });
      }

      if (brandIds.length > 0) {
        const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
        queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
        brandIds.forEach((bid) => {
          queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
        });
      }

      if (searchText) {
        queryString += `&search_text=${encodeURIComponent(searchText)}`;
      }

      const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
        headers: { Lang: "az" },
        cache: "no-store",
      });

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : Array.isArray(data?.items)
        ? data.items
        : [];

      setProductData(items || []);
      setTotalCount(extractTotal(data, items));
    } catch (error) {
      console.error("loadProducts error:", error);
    } finally {
      setLoading(false);
    }
  };

  // URL dəyişəndə həmişə fetch et (real totalCount almaq üçün)
  useEffect(() => {
    loadProducts();
  }, [searchParams]);

  // Pagination click-də məhsulların başladığı hissəyə smooth scroll
  const prevPage = useRef(currentPage);
  useEffect(() => {
    if (prevPage.current !== currentPage && currentPage > 1) {
      const target = document.querySelector(".productPageCards");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      prevPage.current = currentPage;
    }
  }, [currentPage]);

  // ---- Burada öz pagination UI-nı əlavə edirik ----
  const goToPage = useCallback(
    (pageNum) => {
      if (!Number.isFinite(Number(pageNum)) || Number(pageNum) < 1) return;
      const p = Number(pageNum);
      const params = new URLSearchParams(searchParams);

      if (p === 1) params.delete("page");
      else params.set("page", String(p));

      const qs = params.toString();
      router.push(`/products${qs ? `?${qs}` : ""}`);
    },
    [router, searchParams]
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxButtons = 7; // ən çox göstəriləcək səhifə düyməsi
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);

    return (
      <div className="custom-pagination" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="prev"
        >
          ◀
        </button>

        {start > 1 && (
          <>
            <button onClick={() => goToPage(1)}>1</button>
            {start > 2 && <span>…</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            aria-current={p === currentPage ? "page" : undefined}
            style={{
              fontWeight: p === currentPage ? "700" : "400",
              textDecoration: p === currentPage ? "underline" : "none",
            }}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span>…</span>}
            <button onClick={() => goToPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="next"
        >
          ▶
        </button>
      </div>
    );
  };
  // ---- pagination end ----

  const groupedCategories = useMemo(() => {
    const parentCategories = (categoryData || []).filter(
      (category) =>
        !category.parent_id ||
        (Array.isArray(category.parent_id) && category.parent_id.length === 0)
    );
    return parentCategories.map((parentCategory) => {
      const children = (categoryData || []).filter((sub) => {
        const parentRaw = sub.parent_id;
        if (!parentRaw) return false;
        let parents = [];
        if (Array.isArray(parentRaw))
          parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
        else if (typeof parentRaw === "object" && parentRaw.id != null)
          parents = [parentRaw.id];
        else parents = [parentRaw];
        const numericParents = parents
          .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
          .filter(Boolean);
        return numericParents.includes(parentCategory.id);
      });
      return { parent: parentCategory, children };
    });
  }, [categoryData]);

  const breadcrumbCategoryTitle = useMemo(() => {
    if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

    const firstId = Number(selectedCategoryIds[0]);
    const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

    return cat?.title || null;
  }, [selectedCategoryIds, categoryData]);

  const handleCategoryToggleById = useCallback(
    (id) => {
      const numeric = Number(id);
      setSelectedCategoryIds((prev) => {
        const set = new Set(prev.map((v) => Number(v)));
        if (set.has(numeric)) set.delete(numeric);
        else set.add(numeric);
        const arr = normalizeIds(Array.from(set));

        const params = new URLSearchParams(searchParams);
        params.delete("category");
        params.delete("page");

        if (arr.length > 0) {
          arr.forEach((cid) => {
            const catObj = categoryData.find(
              (c) => Number(c.id) === Number(cid)
            );
            const slug = getCategorySlug(catObj || { title: catObj?.title });
            if (slug) params.append("category", slug);
          });
        }

        Array.from(params.keys()).forEach((k) => {
          if (/^filters?\[.*\]/.test(k)) params.delete(k);
        });

        const newSearch = params.toString();
        const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

        router.push(newUrl);

        return arr;
      });
    },
    [router, searchParams, categoryData]
  );

  const handleRemoveCategory = useCallback(
    (id) => {
      handleCategoryToggleById(id);
    },
    [handleCategoryToggleById]
  );

  const handleBrandToggleById = useCallback(
    (brandId) => {
      const bid = Number(brandId);
      setSelectedBrandIds((prev) => {
        const set = new Set(prev);
        if (set.has(bid)) set.delete(bid);
        else set.add(bid);
        return Array.from(set);
      });

      const params = new URLSearchParams(searchParams);
      const current = new Set(
        params
          .getAll("brand")
          .map((v) => parseInt(v, 10))
          .filter(Number.isFinite)
      );

      if (current.has(bid)) current.delete(bid);
      else current.add(bid);

      params.delete("brand");
      params.delete("page");

      Array.from(current).forEach((v) => params.append("brand", String(v)));

      Array.from(params.keys()).forEach((k) => {
        if (/^filters?\[.*\]/.test(k)) params.delete(k);
      });

      const newSearch = params.toString();
      const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

      router.push(newUrl);
    },
    [router, searchParams]
  );

  const renderSelectedCategories = useMemo(() => {
    return selectedCategoryIds.map((id) => {
      const cat = categoryData.find((c) => Number(c.id) === Number(id));
      return {
        id,
        title: cat ? cat.title : `Category ${id}`,
      };
    });
  }, [selectedCategoryIds, categoryData]);

  const renderSelectedBrands = useMemo(() => {
    const list = Array.isArray(brandsData)
      ? brandsData
      : Object.values(brandsData || {});
    return selectedBrandIds.map((bid) => {
      const b = list.find((x) => Number(x?.id) === Number(bid));
      return { id: bid, title: b?.title ?? `Brand ${bid}` };
    });
  }, [selectedBrandIds, brandsData]);

  const singleSelectedParent = useMemo(() => {
    if (selectedCategoryIds.length !== 1) return null;
    const onlyId = Number(selectedCategoryIds[0]);
    const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
    if (!onlyCat) return null;
    const parents = normalizeParentIds(onlyCat.parent_id);
    return parents.length === 0 ? onlyCat : null;
  }, [selectedCategoryIds, categoryData]);

  const childrenOfSelectedParent = useMemo(() => {
    if (!singleSelectedParent) return [];
    const pid = Number(singleSelectedParent.id);
    return (categoryData || []).filter((c) =>
      normalizeParentIds(c.parent_id).includes(pid)
    );
  }, [singleSelectedParent, categoryData]);

  const sourceCategory = useMemo(() => {
    if (
      selectedCategory &&
      (selectedCategory.page_title ||
        selectedCategory.page_description ||
        selectedCategory.meta_title ||
        selectedCategory.meta_description)
    ) {
      return selectedCategory;
    }
    return productData?.[0]?.categories?.[0] || null;
  }, [selectedCategory, productData]);

  const sortedProductData = useMemo(() => {
    const list = [...(productData || [])];
    if (selectedOption?.value === "az") {
      return list.sort((a, b) =>
        (a?.title || "").localeCompare(b?.title || "")
      );
    }
    if (selectedOption?.value === "za") {
      return list.sort((a, b) =>
        (b?.title || "").localeCompare(a?.title || "")
      );
    }
    return list;
  }, [productData, selectedOption]);

  const EmptyState = () => (
    <div className="newSpinner flex flex-col items-center w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
      </svg>
      <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="filterTop topper">
          <strong>Adentta</strong>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <span>{t?.products}</span>

          {breadcrumbCategoryTitle && (
            <>
              <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
              <span>{breadcrumbCategoryTitle}</span>
            </>
          )}
        </div>

        <div className="searchResultsProductCount">
          {searchText && (
            <div className="search-results-info">
              <p>
                {t?.searchResults || "results found for"} "{searchText}" ( {totalCount} )
              </p>
            </div>
          )}
        </div>

        <div className="row">
          <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
            <div className="filter-container">
              <button
                className="filter-title"
                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
              >
                {t?.productsPageFilterTitle || "Filter"}
              </button>

              <div className="selectedFilter desktop-only">
                {renderSelectedCategories.map((cat) => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
                    <p>{cat.title}</p>
                  </div>
                ))}
                {renderSelectedBrands.map((br) => (
                  <div className="selectedFilterInner" key={`brand-${br.id}`}>
                    <span onClick={() => handleBrandToggleById(br.id)}>×</span>
                    <p>{br.title}</p>
                  </div>
                ))}
              </div>

              <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
                <button className="filter-titless">
                  {t?.productsPageFilterTitle || "Filter"}
                </button>

                <div className="selectedFilter mobile-only">
                  {renderSelectedCategories.map((cat) => (
                    <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                      <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
                      <p>{cat.title}</p>
                    </div>
                  ))}
                  {renderSelectedBrands.map((br) => (
                    <div className="selectedFilterInner" key={`brand-${br.id}`}>
                      <span onClick={() => handleBrandToggleById(br.id)}>×</span>
                      <p>{br.title}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <img src="/icons/popupCloseIcon.svg" alt="close" />
                </button>

                <div className="lineFiltered"></div>

                <FilterAccordion
                  title={
                    singleSelectedParent
                      ? singleSelectedParent.title
                      : t?.productsPageFilterCategoryTitle || "Category"
                  }
                >
                  <ul>
                    {singleSelectedParent
                      ? childrenOfSelectedParent.map((child) => {
                          const isChildSelected = selectedCategoryIds.some(
                            (c) => Number(c) === Number(child.id)
                          );
                          return (
                            <li
                              key={child.id}
                              onClick={() => handleCategoryToggleById(child.id)}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                fontWeight: isChildSelected ? "bold" : "normal",
                                marginLeft: "0px",
                                fontSize: "1.4rem",
                                color: "#666",
                              }}
                            >
                              <span>{child.title}</span>
                            </li>
                          );
                        })
                      : groupedCategories.map(({ parent, children }) => {
                          const isParentSelected = selectedCategoryIds.some(
                            (c) => Number(c) === Number(parent.id)
                          );
                          return (
                            <React.Fragment key={parent.id}>
                              <li
                                onClick={() => handleCategoryToggleById(parent.id)}
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  fontWeight: isParentSelected ? "bold" : "normal",
                                  marginBottom: "4px",
                                }}
                              >
                                <span>{parent.title}</span>
                              </li>

                              {children.map((child) => {
                                const isChildSelected = selectedCategoryIds.some(
                                  (c) => Number(c) === Number(child.id)
                                );
                                return (
                                  <li
                                    key={child.id}
                                    onClick={() => handleCategoryToggleById(child.id)}
                                    style={{
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.3rem",
                                      fontWeight: isChildSelected ? "bold" : "normal",
                                      marginLeft: "1.5rem",
                                      fontSize: "1.5rem",
                                      marginBottom: "8px",
                                      color: "#666",
                                    }}
                                  >
                                    <span>{child.title}</span>
                                  </li>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                  </ul>
                </FilterAccordion>

                <div className="lineFiltered"></div>

                <FilterAccordion title={t?.brands || "Brands"}>
                  <div className="filteredSearch">
                    <img src="/icons/searchIcon.svg" alt="search" />
                    <input
                      className="filterSrch"
                      type="text"
                      placeholder={t?.searchText}
                      value={brandSearchTerm}
                      onChange={(e) => setBrandSearchTerm(e.target.value)}
                    />
                  </div>
                  <ul>
                    {(Array.isArray(brandsData)
                      ? brandsData
                      : Object.values(brandsData || {})
                    )
                      .filter((brand) =>
                        brand.title
                          .toLowerCase()
                          .includes(brandSearchTerm.toLowerCase())
                      )
                      .map((brand) => {
                        const checked = selectedBrandIds.includes(
                          Number(brand?.id)
                        );
                        return (
                          <li key={brand?.id ?? brand?.title}>
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  handleBrandToggleById(brand?.id)
                                }
                              />
                              {brand?.title ?? "No title"}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </FilterAccordion>

                <div className="lineFiltered"></div>
              </div>
            </div>
          </div>

          <div className="xl-9 lg-9 md-9 sm-12">
            <div className="productPageCards">
              <div className="productPageSorting">
                <span>{t?.sortBy}</span>
                <div>
                  <ReactSelect
                    t={t}
                    value={selectedOption}
                    onChange={setSelectedOption}
                  />
                </div>
              </div>

              <div className="row relative">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/50 z-10">
                    <div
                      className="loading-spinner"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid #293881",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                  </div>
                )}

                {sortedProductData.length > 0 ? (
                  sortedProductData.map((data, index) => (
                    <div
                      key={`${data.id}-${index}`}
                      className="xl-4 lg-4 md-6 sm-6"
                    >
                      <Link
                        href={`/products/${slugify(data.title || "")}-${data.id}`}
                        className="block"
                      >
                        <div className="homePageProductCardContent">
                          <div className="homePageProCardImgs">
                            <div className="homePageProductCardContentImage">
                              <img
                                src={
                                  data?.image
                                    ? `https://admin.adentta.az/storage${data.image}`
                                    : "/images/adenttaDefaultImg.svg"
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="homePageProductCardContentInner">
                            <div className="homePageProductCardContentText">
                              <span>{data.title}</span>
                            </div>
                            <div className="price">
                              <div className="priceItem">
                                <strong id="prices">{data.price}</strong>
                                <Manat />
                              </div>
                            </div>
                          </div>
                          <div className="homePageProductCardContentBottom">
                            <span>{t?.learnMore}</span>
                            <img src="/icons/arrowTopRight.svg" alt="" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>

              <div className="flex justify-center mt-10">
                {renderPagination()}
              </div>
            </div>
          </div>
        </div>

        <div className="productsPageDescription">
          {(sourceCategory?.page_title || sourceCategory?.page_description) && (
            <>
              <h2>
                {sourceCategory?.page_title || "Page title is not available"}
              </h2>

              {showDetails && (
                <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
                  <div
                    className="page-description-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        sourceCategory?.page_description ||
                        "Page description is not available.",
                    }}
                  />
                </div>
              )}

              <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDetails((prev) => !prev);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {showDetails
                    ? t?.hideDetailsBtn || "Hide"
                    : t?.seeMoreBtn || "See more"}
                  <img
                    src="/icons/rightDown.svg"
                    alt=""
                    style={{
                      marginLeft: "0.25rem",
                      transform: showDetails ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </a>
              </div>
            </>
          )}
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

        .custom-pagination button {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
        }
        .custom-pagination button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .custom-pagination span {
          display: inline-block;
          padding: 0 6px;
        }
      `}</style>
    </div>
  );
};

export default ProductsPageFilter;





































// !  mehsul sehifesinin filteri ucun tam isleyen kod
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam)
//     ? categoryParam[0]
//     : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // Bütün category slugs (URL)
// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// // Accordion həmişə açıq (toggle yoxdur)

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true); // ilkdə açıq

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         {title}
//         <img
//           src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
//           alt="Toggle Icon"
//           className="toggle-icon"
//         />
//       </button>

//       {isOpen && <div className="accordion-content">{children}</div>}
//     </div>
//   );
// };

// // const FilterAccordion = ({ title, children }) => {
// //   return (
// //     <div className="accordion">
// //       <button className="accordion-header">
// //         {title}
// //         <img src="/icons/minus.svg" alt="Toggle Icon" className="toggle-icon" />
// //       </button>
// //       <div className="accordion-content">{children}</div>
// //     </div>
// //   );
// // };

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);

//   // Ümumi nəticə sayı (total)
//   const [totalCount, setTotalCount] = useState(0);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // search_text
//   const searchText = (searchParams.get("search_text") || "").trim();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value)
//           parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);
//         params.delete("category");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find(
//               (c) => Number(c.id) === Number(cid)
//             );
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const pathname =
//           typeof window !== "undefined"
//             ? window.location.pathname
//             : "/product-page";
//         const newSearch = params.toString();

//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState(
//             {},
//             "",
//             pathname + (newSearch ? `?${newSearch}` : "")
//           );
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), {
//             scroll: false,
//           });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   // BRAND toggle: URL-də brand=ID
//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const pathname =
//         typeof window !== "undefined"
//           ? window.location.pathname
//           : "/product-page";
//       const newSearch = params.toString();

//       if (typeof window !== "undefined" && window.history?.pushState) {
//         window.history.pushState(
//           {},
//           "",
//           pathname + (newSearch ? `?${newSearch}` : "")
//         );
//       } else {
//         router.push(pathname + (newSearch ? `?${newSearch}` : ""), {
//           scroll: false,
//         });
//       }
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null;
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map(
//           (slug) =>
//             (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id
//         )
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   // cavabdan TOTAL tap
//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       await delay(1000);

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams
//         .getAll("brand")
//         .map((v) => parseInt(v, 10))
//         .filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) =>
//               expandedSet.add(Number(d))
//             );
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(
//             String(val)
//           )}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(
//             String(bid)
//           )}`;
//         });
//       }

//       if (searchText) {
//         queryString += `&search_text=${encodeURIComponent(searchText)}`;
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setTotalCount((prev) => {
//         const t = extractTotal(data, newItems);
//         return typeof t === "number" ? t : prev;
//       });

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState(
//             {},
//             "",
//             newUrl.pathname + (newSearch ? "?" + newSearch : "")
//           );
//         }
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
//     const prevObj = {};
//     prev.forEach((v, k) => {
//       if (k === "page") return;
//       if (prevObj[k] === undefined) prevObj[k] = v;
//       else if (Array.isArray(prevObj[k])) prevObj[k].push(v);
//       else prevObj[k] = [prevObj[k], v];
//     });
//     const nextObj = {};
//     next.forEach((v, k) => {
//       if (k === "page") return;
//       if (nextObj[k] === undefined) nextObj[k] = v;
//       else if (Array.isArray(nextObj[k])) nextObj[k].push(v);
//       else nextObj[k] = [nextObj[k], v];
//     });
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         const baseIds = getBaseCategoryIdsFromUrlOrState();
//         const brandIds = searchParams
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) =>
//                 expandedSet.add(Number(d))
//               );
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(
//               String(val)
//             )}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(
//               String(bid)
//             )}`;
//           });
//         }

//         if (searchText) {
//           queryString += `&search_text=${encodeURIComponent(searchText)}`;
//         }

//         const { data } = await axiosInstance.get(
//           `/page-data/product?${queryString}`,
//           {
//             headers: { Lang: "az" },
//             cache: "no-store",
//           }
//         );

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.data)
//           ? data.data.data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         setProductData(items || []);

//         setTotalCount(extractTotal(data, items));

//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//     searchText,
//   ]);

//   // SEO mənbə
//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   // 🔹 SORT: A-Z və ya Z-A; default: dəyişmədən (placeholder görünsün deyə selectedOption null qala bilər)
//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list; // seçilməyibsə dəyişmə
//   }, [productData, selectedOption]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

//         {/* <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>
//         </div> */}

//         {/* Axtarış nəticələri (ümumi TOTAL göstərilir) */}
//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ({" "}
//                 {totalCount} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Selected */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>
//                         ×
//                       </span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>
//                         ×
//                       </span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Category (həmişə açıq) */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul
//                   // style={{
//                   //   maxHeight: "300px",
//                   //   overflowY: "auto",
//                   //   paddingRight: "4px",
//                   // }}
//                   >
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const childProductCount = getProductCountForCategory(
//                             child.id
//                           );
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                               {/* <p>({childProductCount})</p> */}
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const parentProductCount = getProductCountForCategory(
//                             parent.id
//                           );
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() =>
//                                   handleCategoryToggleById(parent.id)
//                                 }
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected
//                                     ? "bold"
//                                     : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                                 {/* <p>({parentProductCount})</p> */}
//                               </li>

//                               {children.map((child) => {
//                                 const childProductCount =
//                                   getProductCountForCategory(child.id);
//                                 const isChildSelected =
//                                   selectedCategoryIds.some(
//                                     (c) => Number(c) === Number(child.id)
//                                   );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() =>
//                                       handleCategoryToggleById(child.id)
//                                     }
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected
//                                         ? "bold"
//                                         : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                     {/* <p>({childProductCount})</p> */}
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 {/* Brands (həmişə açıq) */}
//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <div className="applyBTN flex items-center mt-4 justify-center">
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   {/* 🔹 Sort: ReactSelect-a value/onChange verdik */}
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 {/* 🔹 Siyahı sortdan sonra render olunur */}
//                 {sortedProductData.map((data, index) => (
//                   <div
//                     key={`${data.id}-${index}`}
//                     className="xl-4 lg-4 md-6 sm-6"
//                   >
//                     <Link
//                     href={`/products/${slugify(data.title || "")}-${data.id}`}
//                       // href={`/products/${(data.title || "")
//                       //   .toLowerCase()
//                       //   .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
//                               alt=""
//                             />
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentInner">
//                           <div className="homePageProductCardContentText">
//                             <span>{data.title}</span>
//                           </div>
//                           <div className="price">
//                             <div className="priceItem">
//                               <strong id="prices">{data.price}</strong>
//                               <Manat />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentBottom">
//                           <span>{t?.learnMore}</span>
//                           <img src="/icons/arrowTopRight.svg" alt="" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center justify-center flex-col gap-4 py-8">
//               {loading && (
//                 <div
//                   className="loading-spinner"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     border: "4px solid #f3f3f3",
//                     borderTop: "4px solid #293881",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;
























































// !   IR VARYOX KOD VAR BURDA


// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[\/\\]+/g, "-")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam)
//     ? categoryParam[0]
//     : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         {title}
//         <img
//           src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
//           alt="Toggle Icon"
//           className="toggle-icon"
//         />
//       </button>

//       {isOpen && <div className="accordion-content">{children}</div>}
//     </div>
//   );
// };

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [totalCount, setTotalCount] = useState(0);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const searchText = (searchParams.get("search_text") || "").trim();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//       if (urlSlugs.length > 0) {
//         const ids = urlSlugs
//           .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
//           .map(Number)
//           .filter(Number.isFinite);
//         setSelectedCategoryIds(ids.length > 0 ? ids : []);
//       } else {
//         setSelectedCategoryIds([]);
//       }
//     }
//   }, [selectedCategory?.id, searchParams, categoryData]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value)
//           parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);
//         params.delete("category");
//         params.delete("page");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find(
//               (c) => Number(c.id) === Number(cid)
//             );
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const newSearch = params.toString();
//         const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//         router.push(newUrl, { scroll: false });

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev);
//         if (set.has(bid)) set.delete(bid);
//         else set.add(bid);
//         return Array.from(set);
//       });

//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       params.delete("page");

//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const newSearch = params.toString();
//       const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//       router.push(newUrl, { scroll: false });
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null;
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map(
//           (slug) =>
//             (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id
//         )
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams
//         .getAll("brand")
//         .map((v) => parseInt(v, 10))
//         .filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) =>
//               expandedSet.add(Number(d))
//             );
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(
//             String(val)
//           )}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(
//             String(bid)
//           )}`;
//         });
//       }

//       if (searchText) {
//         queryString += `&search_text=${encodeURIComponent(searchText)}`;
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setTotalCount((prev) => {
//         const t = extractTotal(data, newItems);
//         return typeof t === "number" ? t : prev;
//       });

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         const newParams = new URLSearchParams(searchParams);
//         newParams.set("page", String(page));
//         const newUrl = `/products?${newParams.toString()}`;
//         router.push(newUrl, { scroll: false });

//         setCurrentPage(page);
//         prevParamsRef.current = newParams.toString();
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
//     const prevObj = {};
//     prev.forEach((v, k) => {
//       if (k === "page") return;
//       if (prevObj[k] === undefined) prevObj[k] = v;
//       else if (Array.isArray(prevObj[k])) prevObj[k].push(v);
//       else prevObj[k] = [prevObj[k], v];
//     });
//     const nextObj = {};
//     next.forEach((v, k) => {
//       if (k === "page") return;
//       if (nextObj[k] === undefined) nextObj[k] = v;
//       else if (Array.isArray(nextObj[k])) nextObj[k].push(v);
//       else nextObj[k] = [nextObj[k], v];
//     });
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         const baseIds = getBaseCategoryIdsFromUrlOrState();
//         const brandIds = searchParams
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) =>
//                 expandedSet.add(Number(d))
//               );
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(
//               String(val)
//             )}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(
//               String(bid)
//             )}`;
//           });
//         }

//         if (searchText) {
//           queryString += `&search_text=${encodeURIComponent(searchText)}`;
//         }

//         const { data } = await axiosInstance.get(
//           `/page-data/product?${queryString}`,
//           {
//             headers: { Lang: "az" },
//             cache: "no-store",
//           }
//         );

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.data)
//           ? data.data.data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         setProductData(items || []);

//         setTotalCount(extractTotal(data, items));

//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//     searchText,
//   ]);

//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list;
//   }, [productData, selectedOption]);

//   // Empty state (tam ortada)
//   const EmptyState = () => (
//     <div className=" newSpinner flex flex-col items-center  w-full" >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="50"
//         height="50"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#999"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
//       </svg>
//       <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
//     </div>
//   );

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ({" "}
//                 {totalCount} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>
//                         ×
//                       </span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>
//                         ×
//                       </span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul>
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() =>
//                                   handleCategoryToggleById(parent.id)
//                                 }
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected
//                                     ? "bold"
//                                     : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                               </li>

//                               {children.map((child) => {
//                                 const isChildSelected =
//                                   selectedCategoryIds.some(
//                                     (c) => Number(c) === Number(child.id)
//                                   );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() =>
//                                       handleCategoryToggleById(child.id)
//                                     }
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected
//                                         ? "bold"
//                                         : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>

//               {/* Əsas məhsul grid-i – loading və empty state tam ortada */}
//               <div className="row relative" >
//                 {loading && !isLoadingMoreRef.current ? (
//                   <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/50 z-10">
//                     <div
//                       className="loading-spinner"
//                       style={{
//                         marginTop: "20px",
//                         width: "50px",
//                         height: "50px",
//                         border: "4px solid #f3f3f3",
//                         borderTop: "4px solid #293881",
//                         borderRadius: "50%",
//                         animation: "spin 1s linear infinite",
//                       }}
//                     ></div>
//                   </div>
//                 ) : sortedProductData.length > 0 ? (
//                   sortedProductData.map((data, index) => (
//                     <div
//                       key={`${data.id}-${index}`}
//                       className="xl-4 lg-4 md-6 sm-6"
//                     >
//                       <Link
//                         href={`/products/${slugify(data.title || "")}-${data.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={
//                                   data?.image
//                                     ? `https://admin.adentta.az/storage${data.image}`
//                                     : "/images/adenttaDefaultImg.svg"
//                                 }
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{data.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{data.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <EmptyState />
//                 )}
//               </div>
//             </div>

//             {/* Infinite scroll loading (aşağıda qalır, toxunulmayıb) */}
//             <div className="flex items-center justify-center flex-col gap-4 py-8">
//               {loading && hasMore && isLoadingMoreRef.current && (
//                 <div
//                   className="loading-spinner"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     border: "4px solid #f3f3f3",
//                     borderTop: "4px solid #293881",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;

































































































































































// !Esas KOD budur

// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // const slugify = (text) => {
// //   if (!text) return "";
// //   return String(text)
// //     .toLowerCase()
// //     .normalize("NFKD")
// //     .replace(/[\u0300-\u036f]/g, "")
// //     .replace(/[^a-z0-9-]+/g, "-")
// //     .replace(/--+/g, "-")
// //     .replace(/^-+|-+$/g, "");
// // };



// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     // burada slash / və backslash \ də tire ilə əvəz olunur
//     .replace(/[\/\\]+/g, "-")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };




// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam)
//     ? categoryParam[0]
//     : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // Bütün category slugs (URL)
// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// // Accordion həmişə açıq (toggle yoxdur)

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true); // ilkdə açıq

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         {title}
//         <img
//           src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
//           alt="Toggle Icon"
//           className="toggle-icon"
//         />
//       </button>

//       {isOpen && <div className="accordion-content">{children}</div>}
//     </div>
//   );
// };

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);

//   // Ümumi nəticə sayı (total)
//   const [totalCount, setTotalCount] = useState(0);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // search_text
//   const searchText = (searchParams.get("search_text") || "").trim();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value)
//           parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz + router.push ilə navigation
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);
//         params.delete("category");
//         params.delete("page"); // page-i sıfırla ki, yeni filterdən sonra 1-ci səhifədən başlasın

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find(
//               (c) => Number(c.id) === Number(cid)
//             );
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const newSearch = params.toString();
//         const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//         router.push(newUrl, { scroll: false });

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   // BRAND toggle: URL-də brand=ID + router.push
//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       params.delete("page"); // page-i sıfırla

//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const newSearch = params.toString();
//       const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//       router.push(newUrl, { scroll: false });
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null;
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map(
//           (slug) =>
//             (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id
//         )
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   // cavabdan TOTAL tap
//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       await delay(1000);

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams
//         .getAll("brand")
//         .map((v) => parseInt(v, 10))
//         .filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) =>
//               expandedSet.add(Number(d))
//             );
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(
//             String(val)
//           )}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(
//             String(bid)
//           )}`;
//         });
//       }

//       if (searchText) {
//         queryString += `&search_text=${encodeURIComponent(searchText)}`;
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setTotalCount((prev) => {
//         const t = extractTotal(data, newItems);
//         return typeof t === "number" ? t : prev;
//       });

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         // Page dəyişikliyi üçün router.push
//         const newParams = new URLSearchParams(searchParams);
//         newParams.set("page", String(page));
//         const newUrl = `/products?${newParams.toString()}`;
//         router.push(newUrl, { scroll: false });

//         setCurrentPage(page);
//         prevParamsRef.current = newParams.toString();
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
//     const prevObj = {};
//     prev.forEach((v, k) => {
//       if (k === "page") return;
//       if (prevObj[k] === undefined) prevObj[k] = v;
//       else if (Array.isArray(prevObj[k])) prevObj[k].push(v);
//       else prevObj[k] = [prevObj[k], v];
//     });
//     const nextObj = {};
//     next.forEach((v, k) => {
//       if (k === "page") return;
//       if (nextObj[k] === undefined) nextObj[k] = v;
//       else if (Array.isArray(nextObj[k])) nextObj[k].push(v);
//       else nextObj[k] = [nextObj[k], v];
//     });
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         const baseIds = getBaseCategoryIdsFromUrlOrState();
//         const brandIds = searchParams
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) =>
//                 expandedSet.add(Number(d))
//               );
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(
//               String(val)
//             )}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(
//               String(bid)
//             )}`;
//           });
//         }

//         if (searchText) {
//           queryString += `&search_text=${encodeURIComponent(searchText)}`;
//         }

//         const { data } = await axiosInstance.get(
//           `/page-data/product?${queryString}`,
//           {
//             headers: { Lang: "az" },
//             cache: "no-store",
//           }
//         );

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.data)
//           ? data.data.data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         setProductData(items || []);

//         setTotalCount(extractTotal(data, items));

//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//     searchText,
//   ]);

//   // SEO mənbə
//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   // 🔹 SORT: A-Z və ya Z-A; default: dəyişmədən (placeholder görünsün deyə selectedOption null qala bilər)
//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list; // seçilməyibsə dəyişmə
//   }, [productData, selectedOption]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

//         {/* Axtarış nəticələri (ümumi TOTAL göstərilir) */}
//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ({" "}
//                 {totalCount} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Selected */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>
//                         ×
//                       </span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>
//                         ×
//                       </span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Category (həmişə açıq) */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul>
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const childProductCount = getProductCountForCategory(
//                             child.id
//                           );
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const parentProductCount = getProductCountForCategory(
//                             parent.id
//                           );
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() =>
//                                   handleCategoryToggleById(parent.id)
//                                 }
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected
//                                     ? "bold"
//                                     : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                               </li>

//                               {children.map((child) => {
//                                 const childProductCount =
//                                   getProductCountForCategory(child.id);
//                                 const isChildSelected =
//                                   selectedCategoryIds.some(
//                                     (c) => Number(c) === Number(child.id)
//                                   );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() =>
//                                       handleCategoryToggleById(child.id)
//                                     }
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected
//                                         ? "bold"
//                                         : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 {/* Brands (həmişə açıq) */}
//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <div className="applyBTN flex items-center mt-4 justify-center">
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 {sortedProductData.map((data, index) => (
//                   <div
//                     key={`${data.id}-${index}`}
//                     className="xl-4 lg-4 md-6 sm-6"
//                   >
//                     <Link
//                     href={`/products/${slugify(data.title || "")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
//                               alt=""
//                             />
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentInner">
//                           <div className="homePageProductCardContentText">
//                             <span>{data.title}</span>
//                           </div>
//                           <div className="price">
//                             <div className="priceItem">
//                               <strong id="prices">{data.price}</strong>
//                               <Manat />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentBottom">
//                           <span>{t?.learnMore}</span>
//                           <img src="/icons/arrowTopRight.svg" alt="" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center justify-center flex-col gap-4 py-8">
//               {loading && (
//                 <div
//                   className="loading-spinner"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     border: "4px solid #f3f3f3",
//                     borderTop: "4px solid #293881",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;


































// ! BURDAN ASAGIDA NE YAZILIB XEBERIM YOXDU   )))))
// *   her sey isleyir SORT islemir ve mehsul sayi
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // Bütün category slugs (URL)
// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list.map((v) => String(v).split("?")[0].replace(/\/+$/, "")).filter(Boolean);
// }

// // ✅ Accordion həmişə açıq (toggle yoxdur)
// const FilterAccordion = ({ title, children }) => {
//   return (
//     <div className="accordion">
//       <button className="accordion-header">
//         {title}
//         <img src="/icons/minus.svg" alt="Toggle Icon" className="toggle-icon" />
//       </button>
//       <div className="accordion-content">{children}</div>
//     </div>
//   );
// };

// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);

//   // ✅ Ümumi nəticə sayı (total)
//   const [totalCount, setTotalCount] = useState(0);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // NEW: search_text
//   const searchText = (searchParams.get("search_text") || "").trim();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   useEffect(() => {
//     const brands = searchParams.getAll("brand").map((b) => parseInt(b, 10)).filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);
//         params.delete("category");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find((c) => Number(c.id) === Number(cid));
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//         const newSearch = params.toString();

//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   // BRAND toggle: URL-də brand=ID
//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       const params = new URLSearchParams(searchParams);
//       const current = new Set(params.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite));

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//       const newSearch = params.toString();

//       if (typeof window !== "undefined" && window.history?.pushState) {
//         window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//       } else {
//         router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//       }
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData) ? brandsData : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null;
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   // Helper: cavabdan TOTAL tap
//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       await delay(1000);

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//         });
//       }

//       if (searchText) {
//         queryString += `&search_text=${encodeURIComponent(searchText)}`;
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       // ✅ TOTAL-i saxla (ümumi nəticə sayı)
//       setTotalCount((prev) => {
//         const t = extractTotal(data, newItems);
//         return typeof t === "number" ? t : prev;
//       });

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", newUrl.pathname + (newSearch ? "?" + newSearch : ""));
//         }
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
//     const prevObj = {};
//     prev.forEach((v, k) => {
//       if (k === "page") return;
//       if (prevObj[k] === undefined) prevObj[k] = v;
//       else if (Array.isArray(prevObj[k])) prevObj[k].push(v);
//       else prevObj[k] = [prevObj[k], v];
//     });
//     const nextObj = {};
//     next.forEach((v, k) => {
//       if (k === "page") return;
//       if (nextObj[k] === undefined) nextObj[k] = v;
//       else if (Array.isArray(nextObj[k])) nextObj[k].push(v);
//       else nextObj[k] = [nextObj[k], v];
//     });
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         const baseIds = getBaseCategoryIdsFromUrlOrState();
//         const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//           });
//         }

//         if (searchText) {
//           queryString += `&search_text=${encodeURIComponent(searchText)}`;
//         }

//         const { data } = await axiosInstance.get(
//           `/page-data/product?${queryString}`,
//           {
//             headers: { Lang: "az" },
//             cache: "no-store",
//           }
//         );

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.data)
//           ? data.data.data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         setProductData(items || []);

//         // ✅ TOTAL-i ilk yükləmədə də saxla
//         setTotalCount(extractTotal(data, items));

//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//     searchText,
//   ]);

//   // ---------- SEO mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products}</h4>
//         </div>

//         {/* ✅ Axtarış nəticələri (ümumi TOTAL göstərilir) */}
//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ( {totalCount} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Selected */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 {/* ✅ Category (həmişə açıq) */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount = getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount = getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() => handleCategoryToggleById(parent.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount = getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() => handleCategoryToggleById(child.id)}
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected ? "bold" : "normal",
//                                     marginLeft: "1.5rem",
//                                     fontSize: "1.5rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 {/* ✅ Brands (həmişə açıq) */}
//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(Number(brand?.id));
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() => handleBrandToggleById(brand?.id)}
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="applyBTN flex items-center mt-4 justify-center">
//                   <ApplyBTN />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect t={t} />
//                 </div>
//               </div>
//               <div className="row">
//                 {productData.map((data, index) => (
//                   <div
//                     key={`${data.id}-${index}`}
//                     className="xl-4 lg-4 md-6 sm-6"
//                   >
//                     <Link
//                       href={`/products/${(data.title || "")
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
//                               alt=""
//                             />
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentInner">
//                           <div className="homePageProductCardContentText">
//                             <span>{data.title}</span>
//                           </div>
//                           <div className="price">
//                             <div className="priceItem">
//                               <strong id="prices">{data.price}</strong>
//                               <Manat />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentBottom">
//                           <span>{t?.learnMore}</span>
//                           <img src="/icons/arrowTopRight.svg" alt="" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center justify-center flex-col gap-4 py-8">
//               {loading && (
//                 <div
//                   className="loading-spinner"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     border: "4px solid #f3f3f3",
//                     borderTop: "4px solid #293881",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;
