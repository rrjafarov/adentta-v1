
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactSelectCountrySelect from "./ReactSelectCountrySelect";
import ReactSelectCategoryType from "./ReactSelectCategoryType";

const Brands = ({ brandsData, t }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ DÜZƏLDİLMİŞ FİLTER - ID ilə müqayisə edir
  const filteredBrands = brandsData.filter((brand) => {
    // Ölkə filtri - array olub-olmadığını yoxlayırıq
    const matchesCountry = selectedCountry
      ? Array.isArray(brand.country) && brand.country.some(
          (country) => country.id === selectedCountry.value
        )
      : true;

    // Kategoriya filtri - array olub-olmadığını yoxlayırıq
    const matchesCategory = selectedCategory
      ? Array.isArray(brand.category) && brand.category.some(
          (category) => category.id === selectedCategory.value
        )
      : true;

    return matchesCountry && matchesCategory;
  });

  return (
    <div>
      <div className="container">
        <div className="doctorsTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.brands || "Brands"}</h4>
        </div>

        <div className="doctorsPageHeaderText">
          <span>{t?.brands || "Brands"}</span>
          <h2>{t?.brands || "Brands"}</h2>

          <div className="doctorsPageSelectButtons">
            <div className="doctorsSelects">
              <div className="doctorsSelect doctorsSelectDentist">
                <ReactSelectCountrySelect
                  onChange={(value) => setSelectedCountry(value)}
                  t={t}
                />
              </div>
              <div className="doctorsSelect">
                <ReactSelectCategoryType
                  onChange={(value) => setSelectedCategory(value)}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="brandsPageCards">
          <div className="row">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="xl-3 lg-3 md-6 sm-12">
                <Link
                  href={`/brands/${brand?.title?.toLowerCase()
                    .replace(/\s+/g, "-")}-${brand.id}`}
                  className="block"
                >
                  <div className="brandsPageCards">
                    <div className="brandsPageCard">
                      <div className="brandsPageCardImg">
                        {brand.logo && (
                          <Image
                            src={`https://admin.adentta.az/storage${brand.logo}`}
                            alt={brand.title}
                            width={500}
                            height={500}
                          />
                        )}
                      </div>
                      <div className="brandsPageCardText">
                        <span>{brand.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
