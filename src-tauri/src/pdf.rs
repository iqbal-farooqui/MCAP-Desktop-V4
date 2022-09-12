use crate::barcode::generate_barcode;
use lopdf::{xobject, Document};

// (x offset, y offset) in pt from bottom-left of page
pub const QB_BARCODE_POSITION: (f64, f64) = (467.55, 710.5);

// (height, width) in pt
pub const QB_BARCODE_DIMENSION: (f64, f64) = (106.25, -20.0);

pub fn add_barcode_to_pdf(pdf_path: String, barcode_id: String) {
    let pdf_path2 = pdf_path.clone();
    let barcode = generate_barcode(barcode_id);
    let mut pdf_to_insert = Document::load(pdf_path).unwrap();
    for (_, page_id) in pdf_to_insert.get_pages() {
        let barcode2 = barcode.clone();
        let barcode_img = xobject::image_from(barcode2).unwrap();
        pdf_to_insert
            .insert_image(
                page_id,
                barcode_img,
                QB_BARCODE_POSITION,
                QB_BARCODE_DIMENSION,
            )
            .unwrap();
    }
    pdf_to_insert.save(pdf_path2).unwrap();
}

pub fn qb_add_barcode_to_pdf(pdf: Vec<u8>, barcode_id: String) -> String {
    let path = format!("C:/Users/iqbal/Documents/{}.pdf", barcode_id.clone());
    let barcode = generate_barcode(barcode_id);
    let mut pdf_to_insert = Document::load_mem(&pdf).unwrap();
    for (_, page_id) in pdf_to_insert.get_pages() {
        let barcode2 = barcode.clone();
        let barcode_img = xobject::image_from(barcode2).unwrap();
        pdf_to_insert
            .insert_image(
                page_id,
                barcode_img,
                QB_BARCODE_POSITION,
                QB_BARCODE_DIMENSION,
            )
            .unwrap();
    }
    pdf_to_insert.save(path.clone()).unwrap();
    path
}
