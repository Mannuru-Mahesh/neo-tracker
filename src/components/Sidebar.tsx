import type { AsteroidData } from '../types';
import { ShieldAlert, ShieldCheck, Activity, Maximize2, AlertTriangle, ArrowRight } from 'lucide-react';

interface SidebarProps {
  asteroid: AsteroidData | null;
  loading: boolean;
  count: number;
}

export const Sidebar = ({ asteroid, loading, count }: SidebarProps) => {
  return (
    <div className="sidebar-wrapper">
      <div className="glass-panel sidebar-content">
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="title">
            NEO Tracker
          </h1>
          <p className="subtitle">
            Live Earth Orbital Monitoring
          </p>
          <div className="status-badge">
            <div className={`status-dot ${loading ? 'loading' : 'ready'}`}></div>
            <span className="status-text">
              {loading ? 'Initializing Array...' : `${count} Objects Tracked`}
            </span>
          </div>
        </div>

        <div className="flex-1">
          {asteroid ? (
            <div className="asteroid-details">
              
              <div className="asteroid-header">
                <div className="asteroid-title-row">
                  <h2 className="asteroid-name">{asteroid.name}</h2>
                  {asteroid.isHazardous ? (
                    <ShieldAlert className="icon-danger" />
                  ) : (
                    <ShieldCheck className="icon-safe" />
                  )}
                </div>
                <div className="hazard-badge">
                  <span className={asteroid.isHazardous ? 'text-danger' : 'text-safe'}>
                    {asteroid.isHazardous ? 'Potentially Hazardous' : 'Safe Trajectory'}
                  </span>
                </div>
              </div>

              <div className="data-cards">
                <div className="data-card">
                  <div className="data-card-header">
                    <Activity className="icon-sm text-blue" />
                    <span className="data-label">Relative Velocity</span>
                  </div>
                  <div className="data-value-row">
                    <span className="data-value">{parseFloat(asteroid.velocityKps).toFixed(2)}</span>
                    <span className="data-unit">km/s</span>
                  </div>
                </div>

                <div className="data-card">
                  <div className="data-card-header">
                    <Maximize2 className="icon-sm text-purple" />
                    <span className="data-label">Max Diameter</span>
                  </div>
                  <div className="data-value-row">
                    <span className="data-value">{asteroid.estimatedDiameterMax.toFixed(3)}</span>
                    <span className="data-unit">km</span>
                  </div>
                </div>

                <div className="data-card">
                  <div className="data-card-header">
                    <AlertTriangle className="icon-sm text-amber" />
                    <span className="data-label">Miss Distance</span>
                  </div>
                  <div className="data-value-row">
                    <span className="data-value">{(parseFloat(asteroid.missDistanceKm) / 1000000).toFixed(2)}</span>
                    <span className="data-unit">M km</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <ArrowRight style={{ width: '1.5rem', height: '1.5rem', color: 'rgba(255,255,255,0.4)' }} />
              </div>
              <p style={{ fontSize: '0.875rem' }}>Select any orbital anomaly to analyze telemetry</p>
            </div>
          )}
        </div>
        
        <div className="footer">
          <span>Data source: NASA NEO API</span>
          <span>Live Feed</span>
        </div>
      </div>
    </div>
  );
};
