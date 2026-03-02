export type ParticleResults = {
  electron: number;
  positron: number;
  muon: number;
  antimuon: number;
  background: number;
  WW: number;
  angles: number[];
};

export type SessionResults = Record<string, ParticleResults>;

export type MasterclassSession = {
  city: string;
  createdAt: Date;
  host: string | null;
  id: string;
  sessionResults: SessionResults;
  updatedAt: Date;
};

export type TotalResults = {
  electron: number;
  positron: number;
  muon: number;
  antimuon: number;
  background: number;
  WW: number;
};
