import "./style/style.scss";
import { ControllerAlive } from "./core/ControllerAlive";
import { ModelAlive } from "./core/ModelAlive";
import { ViewAlive } from "./core/ViewAlive";

new ControllerAlive(ModelAlive, ViewAlive);
