#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            retrieve_buffer,
            add_barcode,
            open_doc,
            connect_to_quickbooks,
            print_qb_doc
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

mod barcode;
mod models;
mod pdf;
mod print;

use models::*;
use pdf::{add_barcode_to_pdf, qb_add_barcode_to_pdf};
use tauri::{Manager, Window};
use url::Url;

#[tauri::command]
fn retrieve_buffer(path: String) -> BufferResponse {
    BufferResponse::from_path(path)
}

#[tauri::command]
fn add_barcode(path: String, barcode_id: String) {
    add_barcode_to_pdf(path, barcode_id);
}

#[tauri::command]
async fn open_doc(
    handle: tauri::AppHandle,
    path: String,
    software: String,
    doc_type: String,
    id: String,
) {
    let window_title = format!("{} {} {}", software, doc_type, id);
    let file_url: Url = format!("file:///{}", path).parse().unwrap();
    let doc_window =
        tauri::WindowBuilder::new(&handle, "doc", tauri::WindowUrl::External(file_url))
            .build()
            .unwrap();
    doc_window.set_title(&window_title).unwrap();
    doc_window.set_focus().unwrap();
}

#[tauri::command]
async fn connect_to_quickbooks(handle: tauri::AppHandle) {
    let qb_login_url: Url = String::from("http://localhost:8000/api/quickbooks/login")
        .parse()
        .unwrap();

    let qbo_window = tauri::WindowBuilder::new(
        &handle,
        "qbo_auth",
        tauri::WindowUrl::External(qb_login_url),
    )
    .build()
    .unwrap();
    qbo_window.set_title("Connect to QuickBooks").unwrap();
    qbo_window.set_focus().unwrap();
}

#[tauri::command]
async fn print_qb_doc(
    handle: tauri::AppHandle,
    pdf_buffer: Vec<u8>,
    barcode_id: String,
    software: String,
    doc_type: String,
) {
    let barcode_id_2 = barcode_id.clone();
    let mut path = qb_add_barcode_to_pdf(pdf_buffer, barcode_id);
    path = format!("file:///{}", path);
    let js = format!("window.location.replace('{}')", path);
    let window_title = format!("{} {} {}", software, doc_type, barcode_id_2);
    let doc_window: Window;
    if handle.get_window("doc").is_some() {
        doc_window = handle.get_window("doc").unwrap();
        doc_window.eval(js.as_str()).unwrap();
        doc_window.show().unwrap();
    } else {
        let file_url: Url = path.parse().unwrap();
        doc_window =
            tauri::WindowBuilder::new(&handle, "doc", tauri::WindowUrl::External(file_url))
                .build()
                .unwrap();
    }

    doc_window.set_title(&window_title).unwrap();
    doc_window.set_focus().unwrap();
}
