import { FrameworkModule } from './framework.module';

describe('FrameworkModule', () => {
  let frameworkModule: FrameworkModule;

  beforeEach(() => {
    frameworkModule = new FrameworkModule();
  });

  it('should create an instance', () => {
    expect(frameworkModule).toBeTruthy();
  });
});
