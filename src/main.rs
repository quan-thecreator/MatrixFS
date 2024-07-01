use log::*;
use iced::{Sandbox, Element, Settings};
use iced::widget;
fn main() {
    println!("Hello, world!");
    simple_logger::init_with_level(log::Level::Info).unwrap();
    info!("Logs are functional");
    let precondition_check_result: iced::Result = PrecoditionUI::run(Settings::default());
    if(precondition_check_result.is_err()){
        error!("Precondition application failed launching, please retry");
        return;
    }
}
struct PrecoditionUI{

}
struct OperationUI{

}
impl Sandbox for PrecoditionUI{
    type Message = PreconditionUpdates;
    fn new() -> Self {
       return Self{

        }; 
    }
    fn title(&self) -> String {
        return String::from("Precondition Checker");
    }
    fn update(&mut self, message: Self::Message) {
        
    }
    fn view(&self) -> Element<'_, Self::Message> {
        return widget::text("Hello, World!").into();
    }
}
#[derive(Debug, Copy, Clone)]
enum PreconditionUpdates{

}
