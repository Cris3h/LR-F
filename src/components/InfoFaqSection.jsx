"use client";

import { useCallback, useEffect, useState } from "react";
import InfoCard from "@/components/InfoCard";
import styles from "@/styles/infoPage.module.css";

const MOBILE_MQ = "(max-width: 719px)";

function useIsMobileAccordion() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isMobile;
}

export default function InfoFaqSection({ items }) {
  const isMobile = useIsMobileAccordion();
  const accordionActive = isMobile === true;
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (!accordionActive) {
      setOpenId(null);
    }
  }, [accordionActive]);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <ul className={styles.list}>
      {items?.map((obj) => (
        <li key={obj.id} className={styles.listItem}>
          <InfoCard
            id={obj.id}
            q={obj.question}
            a={obj.answer}
            accordionActive={accordionActive}
            isOpen={accordionActive ? openId === obj.id : true}
            onToggle={
              accordionActive ? () => handleToggle(obj.id) : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
}
