export abstract class BaseView<T> {
  abstract draw(data?: T): void;
}
