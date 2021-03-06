import _ from 'lodash';
import radiora2 from 'radiora2';

export class LutronClient {
  constructor(opts) {
    opts = opts || {};
    this.host = opts.host || '192.168.1.201';
    this.username = opts.username || 'lutron';
    this.password = opts.password || 'integration';
    this.client = new radiora2.RadioRa2(this.host, this.username, this.password);
  }

  connect() {
    this.client.connect();
  }

  charliesRoomLights(x) {
    if (_.isBoolean(x)) {
      if (x) {
        this.client.pressButton(24, 2);
      } else {
        this.client.pressButton(24, 4);
      }
    } else if (_.isNumber(x)) {
      this.client.setDimmer(20, x);
    } else {
      throw new Error("boolean or number required");
    }
  }

  franciesRoomLights(x) {
    if (_.isBoolean(x)) {
      if (x) {
        x = 100.0;
      } else {
        x = 0.0;
      }
    }
    process.nextTick(() => {
      process.nextTick(() => {
        process.nextTick(() => {
          this.client.setDimmer(16, x);
        });
        this.client.setDimmer(31, x);
      });
      this.client.setDimmer(17, x);
    });

  }

  allLights(x) {
    if (_.isBoolean(x)) {
      if (x) {
        this.client.pressButton(32, 1);
      } else {
        this.client.pressButton(32, 2);
      }
    } else {
      throw new Error("boolean required");
    }
  }

  commonAreaLights(x) {
    if (_.isBoolean(x)) {
      if (x) {
        this.client.pressButton(32, 3);
      } else {
        this.client.pressButton(32, 4);
      }
    } else {
      throw new Error("boolean required");
    }
  }

}

export default function () {
  let _client = new LutronClient();
  _client.connect();
  return _client;
}
