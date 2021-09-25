import { TickManager } from "../../src/manager/TickManager";
import { TickMath } from "../../src/util/TickMath";
import JSBI from "jsbi";
import { Tick } from "../../src/model/Tick";

export class TickTest {
  private manager: TickManager;
  constructor(manager: TickManager) {
    this.manager = manager;
  }
  clear(tick: number): Promise<void> {
    this.manager.clear(tick);
    return Promise.resolve();
  }

  cross(
    tick: number,
    feeGrowthGlobal0X128: JSBI,
    feeGrowthGlobal1X128: JSBI
  ): Promise<JSBI> {
    const tickToCross = this.manager.getTickReadonly(tick);
    return Promise.resolve(
      tickToCross.cross(feeGrowthGlobal0X128, feeGrowthGlobal1X128)
    );
  }

  getFeeGrowthInside(
    tickLower: number,
    tickUpper: number,
    tickCurrent: number,
    feeGrowthGlobal0X128: JSBI,
    feeGrowthGlobal1X128: JSBI
  ): Promise<{
    feeGrowthInside0X128: JSBI;
    feeGrowthInside1X128: JSBI;
  }> {
    return Promise.resolve(
      this.manager.getFeeGrowthInside(
        tickLower,
        tickUpper,
        tickCurrent,
        feeGrowthGlobal0X128,
        feeGrowthGlobal1X128
      )
    );
  }

  setTick(
    tick: number,
    info: {
      liquidityGross: JSBI;
      liquidityNet: JSBI;
      feeGrowthOutside0X128: JSBI;
      feeGrowthOutside1X128: JSBI;
    }
  ): Promise<Tick> {
    const newTick = new Tick(tick);
    newTick.updateProperties(
      info.liquidityGross,
      info.liquidityNet,
      info.feeGrowthOutside0X128,
      info.feeGrowthOutside1X128
    );
    this.manager.set(newTick);
    return Promise.resolve(newTick);
  }

  tickSpacingToMaxLiquidityPerTick(tickSpacing: number): Promise<JSBI> {
    return Promise.resolve(
      TickMath.tickSpacingToMaxLiquidityPerTick(tickSpacing)
    );
  }

  ticks(tickIndex: number): Promise<Tick> {
    return Promise.resolve(this.manager.getTickReadonly(tickIndex));
  }

  update(
    tick: number,
    tickCurrent: number,
    liquidityDelta: JSBI,
    feeGrowthGlobal0X128: JSBI,
    feeGrowthGlobal1X128: JSBI,
    upper: boolean,
    maxLiquidity: JSBI
  ): Promise<boolean> {
    const tickToUpdate = this.manager.getTickReadonly(tick);
    return Promise.resolve(
      tickToUpdate.update(
        liquidityDelta,
        tickCurrent,
        feeGrowthGlobal0X128,
        feeGrowthGlobal1X128,
        upper,
        maxLiquidity
      )
    );
  }
}
