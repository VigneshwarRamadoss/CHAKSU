"use client";

import { useRef, useEffect } from "react";
import styles from "./PDP.module.css";

type SizeGuideDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SizeGuideDialog({ isOpen, onClose }: SizeGuideDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className={styles.sizeGuideDialog} aria-label="Size Guide">
      <div className={styles.sizeGuideHeader}>
        <h2 className={styles.sizeGuideTitle}>Size Guide</h2>
        <button
          type="button"
          className={styles.sizeGuideCloseBtn}
          onClick={onClose}
          aria-label="Close size guide"
          autoFocus
        >
          Close
        </button>
      </div>

      <div className={styles.sizeGuideBody}>
        <table className={styles.sizeTable}>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (in)</th>
              <th>Length (in)</th>
              <th>Shoulder (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>S</td><td>40</td><td>27</td><td>19</td></tr>
            <tr><td>M</td><td>42</td><td>28</td><td>20</td></tr>
            <tr><td>L</td><td>44</td><td>29</td><td>21</td></tr>
            <tr><td>XL</td><td>46</td><td>30</td><td>22</td></tr>
          </tbody>
        </table>
        <p className={styles.sizeNote}>
          Development placeholder — final measurements from garment spec sheets.
        </p>
      </div>
    </dialog>
  );
}
