use std::fs::read;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct BufferResponse {
    path: String,
    buffer: Vec<u8>,
}

impl BufferResponse {
    pub fn from_path(path: String) -> Self {
        let path2 = path.clone();
        let buffer = read(path2).expect("The file could not be read");
        Self { path, buffer }
    }
}