import Secret from '../secret';
import Express from '../express';
import Database from '../database';
import AccessControl from '../access-control';

class App {
  public clearConsole (): void {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  public loadEnvironment (): void {
    Secret.init();
  }

  public loadServer (): void {
    Express.init();
  }

  public loadDatabase (): void {
    Database.init();
  }

  public loadAccessControl (): void {
    AccessControl.init();
  }
}

export default new App;
