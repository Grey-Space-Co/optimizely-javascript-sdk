/**
 * Copyright 2022-2023, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import PersistentKeyValueCache from './persistentKeyValueCache';

export interface DatafileUpdate {
  datafile: string;
}

export interface DatafileUpdateListener {
  (datafileUpdate: DatafileUpdate): void;
}

// TODO: Replace this with the one from js-sdk-models
interface Managed {
  start(): void;

  stop(): Promise<any>;
}

export interface DatafileManager extends Managed {
  get: () => string;
  on: (eventName: string, listener: DatafileUpdateListener) => () => void;
  onReady: () => Promise<void>;
}

export interface DatafileManagerConfig {
  autoUpdate?: boolean;
  datafile?: string;
  sdkKey: string;
  /** Polling interval in milliseconds to check for datafile updates. */
  updateInterval?: number;
  urlTemplate?: string;
  cache?: PersistentKeyValueCache;
}

export interface NodeDatafileManagerConfig extends DatafileManagerConfig {
  datafileAccessToken?: string;
}
