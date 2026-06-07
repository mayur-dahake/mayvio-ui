// @ts-nocheck
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from "@angular/core";

/**
 * Angular Attribute Directive to trigger Mayvio UI modals.
 * Usage: `<button [mayvioModalTarget]="'#modalOverlay'">Open Modal</button>`
 */
@Directive({
  selector: "[mayvioModalTarget]"
})
export class ModalTargetDirective implements OnInit, OnDestroy {
  @Input("mayvioModalTarget") targetSelector!: string;
  private overlayElement: HTMLElement | null = null;
  private clickListeners: Array<() => void> = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Add escape key handler on document
    document.addEventListener("keydown", this.handleEscape);
  }

  ngOnDestroy() {
    document.removeEventListener("keydown", this.handleEscape);
    this.clickListeners.forEach((cleanup) => cleanup());
    document.body.style.overflow = ""; // reset scroll locking
  }

  @HostListener("click")
  onClick() {
    this.overlayElement = document.querySelector(this.targetSelector) as HTMLElement;
    if (!this.overlayElement) return;

    this.openModal(this.overlayElement);
    this.setupDismissListeners(this.overlayElement);
  }

  private openModal(overlay: HTMLElement) {
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    
    const closeBtn = overlay.querySelector(".modal-close") as HTMLElement;
    closeBtn?.focus();
  }

  private closeModal(overlay: HTMLElement) {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  private setupDismissListeners(overlay: HTMLElement) {
    // Backdrop click listener
    const backdropHandler = (e: MouseEvent) => {
      if (e.target === overlay) {
        this.closeModal(overlay);
      }
    };
    overlay.addEventListener("click", backdropHandler);
    this.clickListeners.push(() => overlay.removeEventListener("click", backdropHandler));

    // Modal close buttons (✕ or dismiss markers)
    overlay.querySelectorAll(".modal-close, [data-modal-dismiss]").forEach((btn) => {
      const dismissHandler = () => this.closeModal(overlay);
      btn.addEventListener("click", dismissHandler);
      this.clickListeners.push(() => btn.removeEventListener("click", dismissHandler));
    });
  }

  private handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.overlayElement) {
      this.closeModal(this.overlayElement);
    }
  };
}
