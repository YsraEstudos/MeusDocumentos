/**
 * PDF Layout Engine Helper
 * Manages cursor position, pagination, and margins.
 */
export class PdfCursor {
    private doc: any;
    private x: number;
    private y: number;
    private margin: number;
    private pageHeight: number;
    private pageWidth: number;
    private lineHeight: number;
    private contentWidth: number;

    constructor(doc: any, margin: number = 20, lineHeight: number = 7) {
        this.doc = doc;
        this.margin = margin;
        this.pageHeight = doc.internal.pageSize.height;
        this.pageWidth = doc.internal.pageSize.width;
        this.x = margin;
        this.y = margin;
        this.lineHeight = lineHeight;
        this.contentWidth = this.pageWidth - (margin * 2);
    }

    /**
     * Resets cursor to top of page (or specific Y if provided)
     */
    resetX() {
        this.x = this.margin;
    }

    /**
     * Checks if there is enough space for 'height'. If not, adds a new page.
     */
    ensureSpace(height: number) {
        if (this.y + height > this.pageHeight - this.margin) {
            this.doc.addPage();
            this.y = this.margin;
            return true; // New page added
        }
        return false;
    }

    /**
     * Adds text with automatic wrapping and pagination.
     * @param text Text to print
     * @param size Font size
     * @param fontStyle Font style (normal, bold, italic)
     * @param color Text color [r, g, b] or gray value
     * @param align 'left' | 'center' | 'right'
     */
    addText(text: string, size: number = 10, fontStyle: string = "normal", color: number | [number, number, number] = 0, align: 'left' | 'center' | 'right' = 'left', extraSpacing: number = 0) {
        this.doc.setFontSize(size);
        this.doc.setFont("helvetica", fontStyle);

        if (Array.isArray(color)) {
            this.doc.setTextColor(color[0], color[1], color[2]);
        } else {
            this.doc.setTextColor(color);
        }

        const lines = this.doc.splitTextToSize(text, this.contentWidth);
        const blockHeight = lines.length * (size * 0.45); // Approximate line height based on font size

        this.ensureSpace(blockHeight + extraSpacing);

        if (align === 'center') {
            this.doc.text(lines, this.pageWidth / 2, this.y, { align: 'center' });
        } else {
            this.doc.text(lines, this.x, this.y);
        }

        this.y += blockHeight + extraSpacing;
    }

    /**
     * Adds vertical space
     */
    addSpace(amount: number) {
        this.ensureSpace(amount);
        this.y += amount;
    }

    getY() {
        return this.y;
    }
}
