# LiPo & LiHV High-Capacity Battery Storage Protocol

Prolonged storage above 3.90V/cell causes cathode electrolyte oxidation, gas puffing, and capacity degradation:
- **Storage Voltage**: 3.82V to 3.85V per cell.
- **Ambient Storage Temperature**: 15°C to 22°C in fireproof explosion-resistant LiPo safe vaults.
- **Auto-Discharge Firmware**: Smart BMS automatically discharges pack to 3.83V after 72 hours of idle time.
- **Cycle Retirement**: Packs showing internal resistance (IR) delta > 4 mOhm across cells are decommissioned from primary flight duty.
